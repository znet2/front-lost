import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { useToast } from '../../components/common/Toast';
import { getRequestById, updateRequest, getItemById, addNotification, addReturnProcess } from '../../services/storageService';
import { getCurrentUser, mockUsers } from '../../data/mockUsers';
import { formatDateTime, generateId } from '../../utils/helpers';

export const RequestDetailPage = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const currentUser = getCurrentUser();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectMessage, setRejectMessage] = useState('');

  const request = getRequestById(requestId!);
  const item = request ? getItemById(request.itemId) : null;
  const requester = request ? mockUsers.find(u => u.id === request.requesterId) : null;
  const owner = request ? mockUsers.find(u => u.id === request.ownerId) : null;

  if (!request || !item) {
    return <div>ไม่พบข้อมูล</div>;
  }

  const isOwner = request.ownerId === currentUser.id;
  const canApproveReject = isOwner && request.status === 'pending';

  const handleApprove = () => {
    updateRequest(request.id, {
      status: 'approved',
      response: {
        message: 'ยืนยันแล้ว สามารถประสานงานการรับของได้',
        date: new Date().toISOString()
      }
    });

    addNotification({
      id: generateId('notif'),
      userId: request.requesterId,
      type: 'request_approved',
      title: 'คำขอรับคืนได้รับการยืนยัน',
      message: `คำขอรับคืน "${item.title}" ได้รับการยืนยันแล้ว`,
      read: false,
      relatedId: request.id,
      relatedType: 'request',
      createdAt: new Date().toISOString()
    });

    // Create return process
    addReturnProcess({
      id: generateId('return'),
      requestId: request.id,
      itemId: item.id,
      senderId: request.ownerId,
      receiverId: request.requesterId,
      status: 'confirmed',
      qrUsed: false,
      timeline: [
        {
          id: '1',
          title: 'คำขอรับคืน',
          date: request.createdAt,
          status: 'completed'
        },
        {
          id: '2',
          title: 'ยืนยันคำขอ',
          date: new Date().toISOString(),
          status: 'completed'
        },
        {
          id: '3',
          title: 'ประสานงานการส่งคืน',
          status: 'current'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    showToast('ยืนยันคำขอเรียบร้อยแล้ว');
    navigate('/returns');
  };

  const handleReject = () => {
    updateRequest(request.id, {
      status: 'rejected',
      response: {
        message: rejectMessage || 'คำขอถูกปฏิเสธ',
        date: new Date().toISOString()
      }
    });

    addNotification({
      id: generateId('notif'),
      userId: request.requesterId,
      type: 'request_rejected',
      title: 'คำขอรับคืนถูกปฏิเสธ',
      message: `คำขอรับคืน "${item.title}" ไม่ได้รับการยืนยัน`,
      read: false,
      relatedId: request.id,
      relatedType: 'request',
      createdAt: new Date().toISOString()
    });

    showToast('ปฏิเสธคำขอเรียบร้อยแล้ว');
    navigate('/requests');
  };

  return (
    <div>
      <button onClick={() => navigate('/requests')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft className="w-5 h-5" />
        ย้อนกลับ
      </button>

      <PageHeader title="รายละเอียดคำขอรับคืน" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Item Info */}
          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-4">ข้อมูลสิ่งของ</h3>
            <div className="flex gap-4">
              <img src={item.images[0]} alt={item.title} className="w-32 h-32 rounded-lg object-cover" />
              <div>
                <h4 className="font-medium text-slate-900 text-lg mb-2">{item.title}</h4>
                <p className="text-slate-600">{item.description}</p>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-4">ข้อมูลยืนยันความเป็นเจ้าของ</h3>
            <p className="text-slate-700 whitespace-pre-wrap">{request.verificationDetails}</p>
          </div>

          {request.response && (
            <div className="card bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-2">การตอบกลับ</h3>
              <p className="text-slate-700 mb-2">{request.response.message}</p>
              <p className="text-sm text-slate-500">{formatDateTime(request.response.date)}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Status Card */}
          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-4">สถานะ</h3>
            <StatusBadge status={request.status} type="request" />
            <p className="text-sm text-slate-600 mt-2">
              สร้างเมื่อ: {formatDateTime(request.createdAt)}
            </p>
          </div>

          {/* Users */}
          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-4">ผู้เกี่ยวข้อง</h3>
            <div className="space-y-3">
              {requester && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">ผู้ขอรับคืน</p>
                  <div className="flex items-center gap-2">
                    <img src={requester.avatar} alt={requester.name} className="w-8 h-8 rounded-full" />
                    <p className="font-medium text-slate-900">{requester.name}</p>
                  </div>
                  {request.status === 'approved' && (
                    <p className="text-sm text-slate-600 mt-1">โทร: {requester.phone}</p>
                  )}
                </div>
              )}
              {owner && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">ผู้พบสิ่งของ</p>
                  <div className="flex items-center gap-2">
                    <img src={owner.avatar} alt={owner.name} className="w-8 h-8 rounded-full" />
                    <p className="font-medium text-slate-900">{owner.name}</p>
                  </div>
                  {request.status === 'approved' && !isOwner && (
                    <p className="text-sm text-slate-600 mt-1">โทร: {owner.phone}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          {canApproveReject && (
            <div className="card space-y-3">
              <button onClick={() => setShowApproveModal(true)} className="btn-primary w-full flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                ยืนยันคำขอ
              </button>
              <button onClick={() => setShowRejectModal(true)} className="btn-danger w-full flex items-center justify-center gap-2">
                <XCircle className="w-5 h-5" />
                ปฏิเสธคำขอ
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={handleApprove}
        title="ยืนยันคำขอรับคืน"
        message="คุณยืนยันว่าผู้ขอรับคืนเป็นเจ้าของสิ่งของนี้ใช่หรือไม่?"
        confirmLabel="ยืนยัน"
      />

      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowRejectModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">ปฏิเสธคำขอ</h3>
            <textarea
              className="input min-h-[100px] mb-4"
              placeholder="เหตุผลในการปฏิเสธ (ไม่บังคับ)"
              value={rejectMessage}
              onChange={(e) => setRejectMessage(e.target.value)}
            />
            <div className="flex gap-3">
              <button onClick={() => setShowRejectModal(false)} className="btn-secondary flex-1">
                ยกเลิก
              </button>
              <button onClick={handleReject} className="btn-danger flex-1">
                ปฏิเสธ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
