import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { ItemCard } from '../../components/items/ItemCard';
import { EmptyState } from '../../components/common/EmptyState';
import { getCurrentUser } from '../../data/mockUsers';
import { getItems } from '../../services/storageService';

export const MyFoundItemsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const currentUser = getCurrentUser();

  const myItems = useMemo(() => {
    const allItems = getItems();
    return allItems.filter(
      item => item.type === 'found' && item.userId === currentUser.id
    );
  }, [currentUser.id]);

  const filteredItems = useMemo(() => {
    return myItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [myItems, searchQuery, statusFilter]);

  return (
    <div>
      <PageHeader
        title="รายการของพบ"
        description="จัดการรายการของที่พบของคุณ"
        action={
          <Link to="/my/found-items/create" className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            แจ้งของที่พบ
          </Link>
        }
      />

      {myItems.length > 0 && (
        <div className="card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <select
              className="input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">สถานะทั้งหมด</option>
              <option value="searching">รอเจ้าของ</option>
              <option value="found">พบเจ้าของแล้ว</option>
              <option value="in_return_process">กำลังดำเนินการส่งคืน</option>
              <option value="returned">คืนเรียบร้อยแล้ว</option>
            </select>
          </div>
        </div>
      )}

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : myItems.length === 0 ? (
        <EmptyState
          icon={Plus}
          title="ยังไม่มีรายการของพบ"
          description="เริ่มต้นด้วยการแจ้งสิ่งของที่พบเจอ"
          action={{
            label: 'แจ้งของที่พบ',
            onClick: () => window.location.href = '/my/found-items/create'
          }}
        />
      ) : (
        <EmptyState
          icon={Search}
          title="ไม่พบรายการที่ค้นหา"
          description="ลองเปลี่ยนคำค้นหาหรือตัวกรอง"
        />
      )}
    </div>
  );
};
