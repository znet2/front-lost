import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Tag, User as UserIcon, Clock, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { getItemById, addRequest, addNotification, getRequests } from '../../services/storageService';
import { getCurrentUser, mockUsers } from '../../data/mockUsers';
import { getCategoryLabel, formatDate, generateId } from '../../utils/helpers';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useToast } from '../../components/common/Toast';

export const ItemDetailPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const currentUser = getCurrentUser();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [verificationDetails, setVerificationDetails] = useState('');

  const item = getItemById(itemId!);
  const requests = getRequests();

  if (!item) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">ไม่พบรายการ</h2>
        <p className="text-slate-600 mb-4">ไม่พบรายการที่คุณค้นหา</p>
        <button onClick={() => navigate('/search')} className="btn-primary">
          กลับไปค้นหา
        </button>
      </div>
    );
  }

  const owner = mockUsers.find(u => u.id === item.userId);
  const isOwner = item.userId === currentUser.id;
  const hasRequested = requests.some(
    r => r.itemId === item.id && r.requesterId === currentUser.id
  );

  const handleRequestReturn = () => {
    if (!verificationDetails.trim()) {
      showToast('กรุณากรอกข้อมูลยืนยันความเป็นเจ้าของ', 'error');
      return;
    }

    const newRequest = {
      id: generateId('req'),
      itemId: item.id,
      itemType: item.type,
      requesterId: currentUser.id,
      ownerId: item.userId,
      status: 'pending' as const,
      verificationDetails,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addRequest(newRequest);

    // Add notification
    addNotification({
      id: generateId('notif'),
      userId: item.userId,
      type: 'request_received',
      title: 'มีคำขอรับคืนใหม่',
      message: `${currentUser.name} ได้ส่งคำขอรับคืนสิ่งของ "${item.title}"`,
      read: false,
      relatedId: newRequest.id,
      relatedType: 'request',
      createdAt: new Date().toISOString()
    });

    showToast('ส่งคำขอรับคืนเรียบร้อยแล้ว');
    setShowRequestModal(false);
    setVerificationDetails('');
    navigate('/requests');
  };

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        ย้อนกลับ
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="card p-0 overflow-hidden mb-4">
            <img
              src={item.images[selectedImage]}
              alt={item.title}
              className="w-full h-96 object-cover"
            />
          </div>
          {item.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {item.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-emerald-500' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`${item.title} ${idx + 1}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Item Details */}
        <div>
          <div className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`badge ${item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {item.type === 'lost' ? 'ของหาย' : 'ของพบ'}
                  </span>
                  <StatusBadge status={item.status} type="item" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h1>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-slate-700">
                <Tag className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">หมวดหมู่</p>
                  <p className="font-medium">{getCategoryLabel(item.category)}</p>
                </div>
              </div>

              {item.color && (
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300" style={{ backgroundColor: item.color }} />
                  <div>
                    <p className="text-sm text-slate-500">สี</p>
                    <p className="font-medium">{item.color}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-slate-700">
                <Calendar className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">
                    {item.type === 'lost' ? 'วันที่ทำหาย' : 'วันที่พบ'}
                  </p>
                  <p className="font-medium">{formatDate(item.date)}</p>
                </div>
              </div>

              {item.time && (
                <div className="flex items-center gap-3 text-slate-700">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">เวลา</p>
                    <p className="font-medium">{item.time}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 text-slate-700">
                <MapPin className="w-5 h-5 text-slate-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">สถานที่</p>
                  <p className="font-medium">{item.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-700">
                <MessageCircle className="w-5 h-5 text-slate-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">รายละเอียด</p>
                  <p className="font-medium">{item.description}</p>
                </div>
              </div>

              {item.additionalDetails && (
                <div className="flex items-start gap-3 text-slate-700">
                  <MessageCircle className="w-5 h-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500">รายละเอียดเพิ่มเติม</p>
                    <p className="font-medium">{item.additionalDetails}</p>
                  </div>
                </div>
              )}

              {owner && !isOwner && (
                <div className="flex items-center gap-3 text-slate-700">
                  <UserIcon className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">
                      {item.type === 'lost' ? 'ผู้ทำหาย' : 'ผู้พบ'}
                    </p>
                    <p className="font-medium">{owner.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {!isOwner && item.type === 'found' && !hasRequested && (
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="btn-primary w-full"
                >
                  ขอรับคืนสิ่งของ
                </button>
              )}

              {!isOwner && item.type === 'found' && hasRequested && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                  <p className="text-amber-800 font-medium">คุณได้ส่งคำขอรับคืนแล้ว</p>
                  <Link to="/requests" className="text-sm text-amber-600 hover:text-amber-700 mt-2 inline-block">
                    ดูสถานะคำขอ →
                  </Link>
                </div>
              )}

              {isOwner && (
                <Link to={`/my/${item.type}-items/${item.id}/edit`} className="btn-secondary w-full block text-center">
                  แก้ไขรายการ
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Request Return Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowRequestModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">ขอรับคืนสิ่งของ</h3>
            <p className="text-sm text-slate-600 mb-4">
              กรุณาระบุข้อมูลเพื่อยืนยันว่าสิ่งของนี้เป็นของคุณ
            </p>

            <div className="mb-4">
              <label className="label">ข้อมูลยืนยันความเป็นเจ้าของ *</label>
              <textarea
                className="input min-h-[100px]"
                placeholder="เช่น ลักษณะเฉพาะ, เลขซีเรียล, รายละเอียดที่มีเพียงเจ้าของรู้..."
                value={verificationDetails}
                onChange={(e) => setVerificationDetails(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowRequestModal(false)} className="btn-secondary flex-1">
                ยกเลิก
              </button>
              <button onClick={handleRequestReturn} className="btn-primary flex-1">
                ส่งคำขอ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
