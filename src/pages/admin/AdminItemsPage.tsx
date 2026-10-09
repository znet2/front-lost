import { useState } from 'react';
import { Search } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { getItems } from '../../services/storageService';
import { getCategoryLabel, formatDate } from '../../utils/helpers';

export const AdminItemsPage = () => {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [searchQuery, setSearchQuery] = useState('');
  
  const allItems = getItems();
  const items = allItems.filter(item => {
    const matchesType = item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div>
      <PageHeader
        title="จัดการรายการ"
        description="จัดการรายการของหายและของพบทั้งหมด"
      />

      <div className="flex gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('lost')}
          className={`px-4 py-2 font-medium border-b-2 ${
            activeTab === 'lost' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-600'
          }`}
        >
          ของหาย
        </button>
        <button
          onClick={() => setActiveTab('found')}
          className={`px-4 py-2 font-medium border-b-2 ${
            activeTab === 'found' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-600'
          }`}
        >
          ของพบ
        </button>
      </div>

      <div className="card mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหารายการ..."
            className="input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-900">ชื่อสิ่งของ</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">หมวดหมู่</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">วันที่</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">สถานที่</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 font-medium text-slate-900">{item.title}</td>
                <td className="py-3 px-4 text-slate-700">{getCategoryLabel(item.category)}</td>
                <td className="py-3 px-4 text-slate-600 text-sm">{formatDate(item.date)}</td>
                <td className="py-3 px-4 text-slate-600 text-sm">{item.location}</td>
                <td className="py-3 px-4"><StatusBadge status={item.status} type="item" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
