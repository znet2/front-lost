import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { getRequests, getItemById } from '../../services/storageService';
import { mockUsers } from '../../data/mockUsers';
import { formatDate } from '../../utils/helpers';

export const AdminRequestsPage = () => {
  const allRequests = getRequests();

  return (
    <div>
      <PageHeader
        title="คำขอรับคืน"
        description="ดูคำขอรับคืนทั้งหมดในระบบ"
      />

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-900">สิ่งของ</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">ผู้ขอ</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">ผู้พบ</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">วันที่</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {allRequests.map(request => {
              const item = getItemById(request.itemId);
              const requester = mockUsers.find(u => u.id === request.requesterId);
              const owner = mockUsers.find(u => u.id === request.ownerId);
              
              return (
                <tr key={request.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium text-slate-900">{item?.title || 'N/A'}</td>
                  <td className="py-3 px-4 text-slate-700">{requester?.name || 'N/A'}</td>
                  <td className="py-3 px-4 text-slate-700">{owner?.name || 'N/A'}</td>
                  <td className="py-3 px-4 text-slate-600 text-sm">{formatDate(request.createdAt)}</td>
                  <td className="py-3 px-4"><StatusBadge status={request.status} type="request" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
