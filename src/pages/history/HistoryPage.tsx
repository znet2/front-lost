import { History } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { getReturnHistory } from '../../services/storageService';
import { getCurrentUser } from '../../data/mockUsers';
import { formatDate } from '../../utils/helpers';

export const HistoryPage = () => {
  const currentUser = getCurrentUser();
  const allHistory = getReturnHistory();

  const myHistory = allHistory.filter(
    h => h.senderId === currentUser.id || h.receiverId === currentUser.id
  );

  return (
    <div>
      <PageHeader
        title="ประวัติการคืน"
        description="ประวัติการส่งคืนสิ่งของที่เสร็จสมบูรณ์"
      />

      {myHistory.length > 0 ? (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-900">รหัส</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">สิ่งของ</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">ผู้ส่ง</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">ผู้รับ</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">วันที่คืน</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {myHistory.map(record => (
                <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm text-slate-600">{record.returnId.slice(0, 12)}...</td>
                  <td className="py-3 px-4 font-medium text-slate-900">{record.itemTitle}</td>
                  <td className="py-3 px-4 text-sm text-slate-700">{record.senderName}</td>
                  <td className="py-3 px-4 text-sm text-slate-700">{record.receiverName}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{formatDate(record.completedDate)}</td>
                  <td className="py-3 px-4">
                    <span className="badge bg-green-100 text-green-800">เสร็จสิ้น</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={History}
          title="ยังไม่มีประวัติการคืน"
          description="เมื่อมีการคืนสิ่งของเสร็จสมบูรณ์ จะแสดงที่นี่"
        />
      )}
    </div>
  );
};
