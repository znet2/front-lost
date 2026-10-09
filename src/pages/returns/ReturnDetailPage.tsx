import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, QrCode } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { getReturnProcessById, getItemById } from '../../services/storageService';
import { mockUsers } from '../../data/mockUsers';

export const ReturnDetailPage = () => {
  const { returnId } = useParams();
  const navigate = useNavigate();
  
  const returnProcess = getReturnProcessById(returnId!);
  const item = returnProcess ? getItemById(returnProcess.itemId) : null;
  const sender = returnProcess ? mockUsers.find(u => u.id === returnProcess.senderId) : null;
  const receiver = returnProcess ? mockUsers.find(u => u.id === returnProcess.receiverId) : null;

  if (!returnProcess || !item) {
    return <div>ไม่พบข้อมูล</div>;
  }

  return (
    <div>
      <button onClick={() => navigate('/returns')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft className="w-5 h-5" />
        ย้อนกลับ
      </button>

      <PageHeader title="รายละเอียดการส่งคืน" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-4">ข้อมูลสิ่งของ</h3>
            <div className="flex gap-4">
              <img src={item.images[0]} alt={item.title} className="w-32 h-32 rounded-lg object-cover" />
              <div>
                <h4 className="font-medium text-slate-900 text-lg">{item.title}</h4>
                <p className="text-slate-600 mt-2">{item.description}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              {returnProcess.timeline.map((event, idx) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      event.status === 'completed' ? 'bg-green-500' :
                      event.status === 'current' ? 'bg-emerald-500' : 'bg-slate-300'
                    }`} />
                    {idx < returnProcess.timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-slate-200" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium text-slate-900">{event.title}</p>
                    {event.description && <p className="text-sm text-slate-600 mt-1">{event.description}</p>}
                    {event.date && <p className="text-xs text-slate-500 mt-1">{new Date(event.date).toLocaleString('th-TH')}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-4">สถานะ</h3>
            <StatusBadge status={returnProcess.status} type="return" />
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-4">ผู้เกี่ยวข้อง</h3>
            <div className="space-y-3">
              {sender && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">ผู้ส่งคืน</p>
                  <div className="flex items-center gap-2">
                    <img src={sender.avatar} alt={sender.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-medium text-slate-900">{sender.name}</p>
                      <p className="text-sm text-slate-600">{sender.phone}</p>
                    </div>
                  </div>
                </div>
              )}
              {receiver && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">ผู้รับคืน</p>
                  <div className="flex items-center gap-2">
                    <img src={receiver.avatar} alt={receiver.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-medium text-slate-900">{receiver.name}</p>
                      <p className="text-sm text-slate-600">{receiver.phone}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {returnProcess.status !== 'completed' && (
            <Link to={`/returns/${returnProcess.id}/qr`} className="btn-primary w-full flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5" />
              ดู QR Code
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
