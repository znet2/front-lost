import { useNavigate } from 'react-router-dom';
import { Bell, Check } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, saveNotifications } from '../../services/storageService';
import { getCurrentUser } from '../../data/mockUsers';
import { formatRelativeTime } from '../../utils/helpers';

export const NotificationsPage = () => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const allNotifications = getNotifications().filter(n => n.userId === currentUser.id);
  const notifications = filter === 'unread' ? allNotifications.filter(n => !n.read) : allNotifications;

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationAsRead(notif.id);
    
    if (notif.relatedType === 'item' && notif.relatedId) {
      navigate(`/items/${notif.relatedId}`);
    } else if (notif.relatedType === 'request' && notif.relatedId) {
      navigate(`/requests/${notif.relatedId}`);
    } else if (notif.relatedType === 'return' && notif.relatedId) {
      navigate(`/returns/${notif.relatedId}`);
    }
  };

  const handleMarkAllRead = () => {
    markAllNotificationsAsRead(currentUser.id);
    window.location.reload();
  };

  return (
    <div>
      <PageHeader
        title="การแจ้งเตือน"
        description="รับการแจ้งเตือนเกี่ยวกับสิ่งของและคำขอของคุณ"
        action={
          allNotifications.some(n => !n.read) && (
            <button onClick={handleMarkAllRead} className="btn-secondary flex items-center gap-2">
              <Check className="w-5 h-5" />
              อ่านทั้งหมด
            </button>
          )
        }
      />

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === 'all' ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          ทั้งหมด ({allNotifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === 'unread' ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          ยังไม่อ่าน ({allNotifications.filter(n => !n.read).length})
        </button>
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-2">
          {notifications.map(notif => (
            <button
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`card w-full text-left hover:shadow-lg transition-all ${
                !notif.read ? 'bg-emerald-50 border-emerald-200' : ''
              }`}
            >
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  !notif.read ? 'bg-emerald-100' : 'bg-slate-100'
                }`}>
                  <Bell className={`w-5 h-5 ${!notif.read ? 'text-emerald-600' : 'text-slate-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-slate-900">{notif.title}</h3>
                    {!notif.read && (
                      <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-slate-600 mt-1">{notif.message}</p>
                  <p className="text-sm text-slate-500 mt-2">{formatRelativeTime(notif.createdAt)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bell}
          title={filter === 'unread' ? 'ไม่มีการแจ้งเตือนที่ยังไม่อ่าน' : 'ยังไม่มีการแจ้งเตือน'}
          description={filter === 'unread' ? 'คุณอ่านการแจ้งเตือนทั้งหมดแล้ว' : 'เมื่อมีกิจกรรมใหม่ จะแจ้งเตือนที่นี่'}
        />
      )}
    </div>
  );
};
