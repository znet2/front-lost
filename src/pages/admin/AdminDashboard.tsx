import { AlertCircle, Package, FileText, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { getItems, getRequests, getReturnHistory } from '../../services/storageService';
import { getCategoryLabel } from '../../utils/helpers';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const AdminDashboard = () => {
  const allItems = getItems();
  const lostItems = allItems.filter(i => i.type === 'lost');
  const foundItems = allItems.filter(i => i.type === 'found');
  const allRequests = getRequests();
  const returnHistory = getReturnHistory();

  // Category data
  const categoryData = Object.entries(
    allItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([category, count]) => ({
    name: getCategoryLabel(category as any),
    value: count
  }));

  // Monthly data (mock)
  const monthlyData = [
    { month: 'ม.ค.', lost: 12, found: 8 },
    { month: 'ก.พ.', lost: 19, found: 15 },
    { month: 'มี.ค.', lost: lostItems.length, found: foundItems.length },
  ];

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="ภาพรวมของระบบทั้งหมด"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="รายการของหาย"
          value={lostItems.length}
          icon={AlertCircle}
          color="bg-red-500"
        />
        <StatCard
          title="รายการของพบ"
          value={foundItems.length}
          icon={Package}
          color="bg-emerald-500"
        />
        <StatCard
          title="คำขอรับคืน"
          value={allRequests.length}
          icon={FileText}
          color="bg-amber-500"
        />
        <StatCard
          title="คืนสำเร็จ"
          value={returnHistory.length}
          icon={CheckCircle}
          color="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Chart */}
        <div className="card">
          <h3 className="font-semibold text-slate-900 mb-4">รายการรายเดือน</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="lost" fill="#ef4444" name="ของหาย" />
              <Bar dataKey="found" fill="#10b981" name="ของพบ" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Chart */}
        <div className="card">
          <h3 className="font-semibold text-slate-900 mb-4">รายการตามหมวดหมู่</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Items */}
      <div className="card">
        <h3 className="font-semibold text-slate-900 mb-4">รายการล่าสุด</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-4 font-semibold text-slate-900">ชื่อสิ่งของ</th>
                <th className="text-left py-2 px-4 font-semibold text-slate-900">ประเภท</th>
                <th className="text-left py-2 px-4 font-semibold text-slate-900">หมวดหมู่</th>
                <th className="text-left py-2 px-4 font-semibold text-slate-900">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {allItems.slice(0, 5).map(item => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 px-4 font-medium text-slate-900">{item.title}</td>
                  <td className="py-2 px-4">
                    <span className={`badge ${item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {item.type === 'lost' ? 'ของหาย' : 'ของพบ'}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-slate-700">{getCategoryLabel(item.category)}</td>
                  <td className="py-2 px-4 text-slate-700">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
