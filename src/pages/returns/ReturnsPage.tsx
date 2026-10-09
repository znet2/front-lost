import { Link } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { getCurrentUser, mockUsers } from '../../data/mockUsers';
import { getReturnProcesses, getItemById } from '../../services/storageService';

export const ReturnsPage = () => {
  const currentUser = getCurrentUser();
  const allReturns = getReturnProcesses();

  const myReturns = allReturns.filter(
    r => r.senderId === currentUser.id || r.receiverId === currentUser.id
  );

  return (
    <div>
      <PageHeader
        title="การส่งคืน"
        description="จัดการกระบวนการส่งคืนสิ่งของ"
      />

      {myReturns.length > 0 ? (
        <div className="space-y-4">
          {myReturns.map(returnProcess => {
            const item = getItemById(returnProcess.itemId);
            const otherUser = mockUsers.find(u => 
              u.id === (returnProcess.senderId === currentUser.id ? returnProcess.receiverId : returnProcess.senderId)
            );
            
            if (!item) return null;

            return (
              <Link
                key={returnProcess.id}
                to={`/returns/${returnProcess.id}`}
                className="card hover:shadow-lg transition-all"
              >
                <div className="flex gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <StatusBadge status={returnProcess.status} type="return" />
                    </div>
                    {otherUser && (
                      <p className="text-sm text-slate-600">
                        {returnProcess.senderId === currentUser.id ? 'ส่งคืนถึง' : 'รับคืนจาก'}: {otherUser.name}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={RotateCcw}
          title="ยังไม่มีการส่งคืน"
          description="เมื่อมีการยืนยันคำขอรับคืน จะแสดงที่นี่"
        />
      )}
    </div>
  );
};
