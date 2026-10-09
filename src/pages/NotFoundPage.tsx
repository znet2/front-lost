import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-emerald-600">404</h1>
          <h2 className="text-2xl font-semibold text-slate-900 mt-4">ไม่พบหน้าที่คุณค้นหา</h2>
          <p className="text-slate-600 mt-2">หน้าที่คุณพยายามเข้าถึงอาจถูกย้ายหรือไม่มีอยู่แล้ว</p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            ย้อนกลับ
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-primary flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
};
