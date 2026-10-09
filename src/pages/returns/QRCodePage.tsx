import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { PageHeader } from '../../components/common/PageHeader';
import { getReturnProcessById, getItemById, updateReturnProcess } from '../../services/storageService';
import { useEffect } from 'react';
import { generateId } from '../../utils/helpers';

export const QRCodePage = () => {
  const { returnId } = useParams();
  const navigate = useNavigate();
  
  const returnProcess = getReturnProcessById(returnId!);
  const item = returnProcess ? getItemById(returnProcess.itemId) : null;

  useEffect(() => {
    if (returnProcess && !returnProcess.qrCode) {
      const qrData = generateId('qr');
      updateReturnProcess(returnProcess.id, {
        qrCode: qrData,
        status: 'qr_generated',
        timeline: [
          ...returnProcess.timeline,
          {
            id: generateId('timeline'),
            title: 'สร้าง QR Code',
            date: new Date().toISOString(),
            status: 'completed'
          }
        ]
      });
    }
  }, [returnProcess]);

  if (!returnProcess || !item) {
    return <div>ไม่พบข้อมูล</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(`/returns/${returnId}`)} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft className="w-5 h-5" />
        ย้อนกลับ
      </button>

      <PageHeader title="QR Code สำหรับการส่งคืน" />

      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="bg-white p-8 rounded-xl inline-block">
            <QRCodeSVG
              value={returnProcess.qrCode || returnProcess.id}
              size={256}
              level="H"
              includeMargin
            />
          </div>
          
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-slate-900 text-lg">{item.title}</h3>
            <p className="text-slate-600">รหัสอ้างอิง: {returnProcess.qrCode || returnProcess.id}</p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left mt-6">
              <h4 className="font-semibold text-amber-900 mb-2">วิธีใช้งาน:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-amber-800">
                <li>แสดง QR Code นี้ให้ผู้รับเห็น</li>
                <li>ผู้รับสแกน QR Code เพื่อยืนยันการรับสิ่งของ</li>
                <li>ระบบจะบันทึกการส่งคืนโดยอัตโนมัติ</li>
              </ol>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left mt-4">
              <p className="text-sm text-red-800">
                <strong>หมายเหตุ:</strong> QR Code นี้เป็นการสาธิตเท่านั้น 
                ในระบบจริงต้องมี Backend ตรวจสอบความถูกต้องและป้องกันการใช้ซ้ำ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
