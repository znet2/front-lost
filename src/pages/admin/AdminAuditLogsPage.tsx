import { FileBarChart } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';

export const AdminAuditLogsPage = () => {
  // Mock audit logs
  const auditLogs = [
    {
      id: '1',
      timestamp: new Date().toISOString(),
      userName: 'สมชาย ใจดี',
      action: 'สร้างรายการของหาย',
      entityType: 'item',
      result: 'success'
    }
  ];

  return (
    <div>
      <PageHeader
        title="Audit Logs"
        description="บันทึกกิจกรรมทั้งหมดในระบบ"
      />

      {auditLogs.length > 0 ? (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-900">เวลา</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">ผู้ใช้</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">การกระทำ</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">ประเภท</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">ผลลัพธ์</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {new Date(log.timestamp).toLocaleString('th-TH')}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">{log.userName}</td>
                  <td className="py-3 px-4 text-slate-700">{log.action}</td>
                  <td className="py-3 px-4 text-slate-700">{log.entityType}</td>
                  <td className="py-3 px-4">
                    <span className={`badge ${
                      log.result === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {log.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={FileBarChart}
          title="ยังไม่มี Audit Logs"
          description="บันทึกกิจกรรมจะแสดงที่นี่"
        />
      )}
    </div>
  );
};
