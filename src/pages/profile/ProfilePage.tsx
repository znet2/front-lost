import { User, Mail, Phone, Settings, Bell } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { getCurrentUser } from '../../data/mockUsers';

export const ProfilePage = () => {
  const currentUser = getCurrentUser();

  return (
    <div>
      <PageHeader title="โปรไฟล์" description="จัดการข้อมูลส่วนตัวและการตั้งค่า" />

      <div className="max-w-3xl">
        <div className="card mb-6">
          <div className="flex items-center gap-6 mb-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{currentUser.name}</h2>
              <p className="text-slate-600">{currentUser.email}</p>
              <span className={`badge mt-2 ${
                currentUser.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'
              }`}>
                {currentUser.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน'}
              </span>
            </div>
          </div>
        </div>

        <div className="card mb-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            ข้อมูลส่วนตัว
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-700">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">อีเมล</p>
                <p className="font-medium">{currentUser.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Phone className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">เบอร์โทรศัพท์</p>
                <p className="font-medium">{currentUser.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            การแจ้งเตือน
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-700">แจ้งเตือนเมื่อพบรายการที่ตรงกัน</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-700">แจ้งเตือนคำขอรับคืนใหม่</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-700">แจ้งเตือนการเปลี่ยนสถานะ</span>
            </label>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            ความเป็นส่วนตัว
          </h3>
          <p className="text-slate-600 mb-4">
            ข้อมูลติดต่อของคุณจะถูกแสดงเฉพาะเมื่อคำขอรับคืนได้รับการยืนยันแล้วเท่านั้น
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>หมายเหตุ:</strong> การตั้งค่าความเป็นส่วนตัวในระบบ Demo นี้เป็นเพียงการแสดงผล
              ในระบบจริงต้องมีการตรวจสอบที่ Backend
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
