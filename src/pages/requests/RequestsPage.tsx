import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { getCurrentUser, mockUsers } from '../../data/mockUsers';
import { getRequests, getItemById } from '../../services/storageService';
import { formatRelativeTime } from '../../utils/helpers';

export const RequestsPage = () => {
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent');
  const currentUser = getCurrentUser();
  const allRequests = getRequests();

  const sentRequests = allRequests.filter(r => r.requesterId === currentUser.id);
  const receivedRequests = allRequests.filter(r => r.ownerId === currentUser.id);

  const requests = activeTab === 'sent' ? sentRequests : receivedRequests;

  return (
    <div>
      <PageHeader
        title="คำขอรับคืน"
        description="จัดการคำขอรับคืนสิ่งของ"
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('sent')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'sent'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          คำขอที่ฉันส่ง ({sentRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('received')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'received'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          คำขอที่ฉันได้รับ ({receivedRequests.length})
        </button>
      </div>

      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map(request => {
            const item = getItemById(request.itemId);
            const otherUser = mockUsers.find(u => 
              u.id === (activeTab === 'sent' ? request.ownerId : request.requesterId)
            );
            
            if (!item || !otherUser) return null;

            return (
              <Link
                key={request.id}
                to={`/requests/${request.id}`}
                className="card hover:shadow-lg transition-all"
              >
                <div className="flex gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <StatusBadge status={request.status} type="request" />
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      {activeTab === 'sent' ? 'ผู้พบ' : 'ผู้ขอรับคืน'}: {otherUser.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatRelativeTime(request.createdAt)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title={activeTab === 'sent' ? 'ยังไม่มีคำขอที่ส่ง' : 'ยังไม่มีคำขอที่ได้รับ'}
          description={activeTab === 'sent' ? 'คุณยังไม่ได้ส่งคำขอรับคืนใดๆ' : 'ยังไม่มีใครส่งคำขอรับคืนถึงคุณ'}
        />
      )}
    </div>
  );
};
