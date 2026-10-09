import { PageHeader } from '../../components/common/PageHeader';
import { mockUsers } from '../../data/mockUsers';
import { getItems } from '../../services/storageService';

export const AdminUsersPage = () => {
  const allItems = getItems();
  
  const usersWithStats = mockUsers.map(user => ({
    ...user,
    itemCount: allItems.filter(i => i.userId === user.id).length
  }));

  return (
    <div>
      <PageHeader
        title="ผู้ใช้งาน"
        description="จัดการผู้ใช้งานในระบบ"
      />

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-900">ผู้ใช้</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">อีเมล</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">โทรศัพท์</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">บทบาท</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">รายการ</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {usersWithStats.map(user => (
              <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                    <span className="font-medium text-slate-900">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-700">{user.email}</td>
                <td className="py-3 px-4 text-slate-700">{user.phone}</td>
                <td className="py-3 px-4">
                  <span className={`badge ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {user.role === 'admin' ? 'Admin' : 'User'}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-700">{user.itemCount}</td>
                <td className="py-3 px-4">
                  <span className="badge bg-green-100 text-green-800">{user.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
