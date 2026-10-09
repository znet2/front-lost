import { useState, useMemo } from 'react';
import { Search, Filter, X, Grid, List as ListIcon } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { ItemCard } from '../../components/items/ItemCard';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { getItems } from '../../services/storageService';
import { Category, SearchFilters } from '../../types';
import { getAllCategories, getCategoryLabel } from '../../utils/helpers';

export const SearchPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: undefined,
    dateFrom: '',
    dateTo: '',
    location: '',
    status: undefined
  });

  const allItems = getItems();

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      // Query filter
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDescription = item.description.toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription && !matchesLocation) return false;
      }

      // Category filter
      if (filters.category && item.category !== filters.category) return false;

      // Date range filter
      if (filters.dateFrom && item.date < filters.dateFrom) return false;
      if (filters.dateTo && item.date > filters.dateTo) return false;

      // Location filter
      if (filters.location && !item.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status && item.status !== filters.status) return false;

      return true;
    });
  }, [allItems, filters]);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: undefined,
      dateFrom: '',
      dateTo: '',
      location: '',
      status: undefined
    });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '' && v !== undefined);

  return (
    <div>
      <PageHeader
        title="ค้นหาสิ่งของ"
        description="ค้นหาสิ่งของที่หายหรือพบเจอ"
      />

      {/* Search Bar */}
      <div className="card mb-6">
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาชื่อสิ่งของ, สถานที่, คำอธิบาย..."
              className="input pl-10"
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary ${hasActiveFilters ? 'bg-emerald-50 border-emerald-300' : ''}`}
          >
            <Filter className="w-5 h-5" />
            <span className="hidden sm:inline ml-2">ตัวกรอง</span>
          </button>
          <button onClick={handleSearch} className="btn-primary">
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline ml-2">ค้นหา</span>
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="pt-4 border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="label">หมวดหมู่</label>
                <select
                  className="input"
                  value={filters.category || ''}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value as Category || undefined })}
                >
                  <option value="">ทั้งหมด</option>
                  {getAllCategories().map(cat => (
                    <option key={cat} value={cat}>{getCategoryLabel(cat)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">วันที่เริ่มต้น</label>
                <input
                  type="date"
                  className="input"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                />
              </div>

              <div>
                <label className="label">วันที่สิ้นสุด</label>
                <input
                  type="date"
                  className="input"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                />
              </div>

              <div>
                <label className="label">สถานที่</label>
                <input
                  type="text"
                  className="input"
                  placeholder="ระบุสถานที่..."
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>

              <div>
                <label className="label">สถานะ</label>
                <select
                  className="input"
                  value={filters.status || ''}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value as any || undefined })}
                >
                  <option value="">ทั้งหมด</option>
                  <option value="searching">กำลังค้นหา</option>
                  <option value="found">พบของแล้ว</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button onClick={clearFilters} className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-2">
                  <X className="w-4 h-4" />
                  ล้างตัวกรอง
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-600">
          พบ <span className="font-semibold text-slate-900">{filteredItems.length}</span> รายการ
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <ListIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : filteredItems.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="ไม่พบรายการที่ค้นหา"
          description="ลองเปลี่ยนเงื่อนไขการค้นหาหรือตัวกรอง"
          action={hasActiveFilters ? {
            label: 'ล้างตัวกรอง',
            onClick: clearFilters
          } : undefined}
        />
      )}
    </div>
  );
};
