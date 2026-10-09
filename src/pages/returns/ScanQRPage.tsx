import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Check } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { useToast } from '../../components/common/Toast';
import { getReturnProcesses, updateReturnProcess, updateItem, addReturnHistory, addNotification } from '../../services/storageService';
import { generateId } from '../../utils/helpers';
import { getCurrentUser } from '../../data/mockUsers';

export const ScanQRPage = () => {
  const [qrCode, setQrCode] = useState('');
  const [confirmedReturn, setConfirmedReturn] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const currentUser = getCurrentUser();

  const handleConfirm = () => {
    if (!qrCode.trim()) {
      showToast('กรุณาระบุรหัสอ้างอิง', 'error');
      return;
    }

    const allReturns = getReturnProcesses();
    const returnProcess = allReturns.find(r => r.qrCode === qrCode || r.id === qrCode);

    if (!returnProcess) {
      showToast('ไม่พบรหัสอ้างอิงนี้', 'error');
      return;
    }

    if (returnProcess.qrUsed) {
      showToast('QR Code นี้ถูกใช้งานแล้ว', 'error');
      return;
    }

    // Update return process
    updateReturnProcess(returnProcess.id, {
      status: 'completed',
      qrUsed: true,
      timeline: [
        ...returnProcess.timeline,
        {
          id: generateId('timeline'),
          title: 'ยืนยันการรับสิ่งของ',
          date: new Date().toISOString(),
          status: 'completed'
        }
      ]
    });

    // Update item status
    updateItem(returnProcess.itemId, { status: 'returned' });

    // Add to history
    addReturnHistory({
      id: generateId('history'),
      returnId: returnProcess.id,
      itemId: returnProcess.itemId,
      itemTitle: 'สิ่งของ', // Would fetch from item
      senderId: returnProcess.senderId,
      senderName: 'ผู้ส่ง',
      receiverId: returnProcess.receiverId,
      receiverName: 'ผู้รับ',
      completedDate: new Date().toISOString(),
      status: 'completed'
    });

    // Add notifications
    [returnProcess.senderId, returnProcess.receiverId].forEach(userId => {
      addNotification({
        id: generateId('notif'),
        userId,
        type: 'return_completed',
        title: 'คืนสิ่งของสำเร็จ',
        message: 'การส่งคืนสิ่งของเสร็จสมบูรณ์แล้ว',
        read: false,
        relatedId: returnProcess.id,
        relatedType: 'return',
        createdAt: new Date().toISOString()
      });
    });

    setConfirmedReturn(true);
    showToast('ยืนยันการรับสิ่งของสำเร็จ');
    
    setTimeout(() => {
      navigate('/history');
    }, 2000);
  };

  return (
    <div>
      <PageHeader
        title="สแกน QR Code"
        description="สแกนเพื่อยืนยันการรับสิ่งของ"
      />

      <div className="max-w-2xl mx-auto">
        {!confirmedReturn ? (
          <div className="card">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">ยืนยันการรับสิ่งของ</h3>
              <p className="text-slate-600">ระบุรหัสอ้างอิงจาก QR Code</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">รหัสอ้างอิง *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="ระบุรหัสอ้างอิงหรือ QR Code"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                />
              </div>

              <button onClick={handleConfirm} className="btn-primary w-full">
                ยืนยันการรับสิ่งของ
              </button>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>สำหรับการทดสอบ:</strong> ใช้รหัสอ้างอิงที่ได้จากหน้า QR Code
              </p>
            </div>
          </div>
        ) : (
          <div className="card text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">ยืนยันสำเร็จ!</h3>
            <p className="text-slate-600 mb-6">การส่งคืนสิ่งของเสร็จสมบูรณ์แล้ว</p>
            <button onClick={() => navigate('/history')} className="btn-primary">
              ดูประวัติการคืน
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
