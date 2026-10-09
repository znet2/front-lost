import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Package, FileText, CheckCircle, Search, Plus, TrendingUp } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { EmptyState } from '../../components/common/EmptyState';
import { getCurrentUser } from '../../data/mockUsers';
import { getItems, getRequests, getReturnHistory } from '../../services/storageService';
import { formatRelativeTime, getCategoryLabel } from '../../utils/helpers';
import { findAllMatchesForUser } from '../../services/matchingService';

export const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const allItems = getItems();
  const allRequests = getRequests();
  const returnHistory = getReturnHistory();

  // Filter user's items
  const myLostItems = allItems.filter(
    item => item.type === 'lost' && item.userId === currentUser.id
  );
  const myFoundItems = allItems.filter(
    item => item.type === 'found' && item.userId === currentUser.id
  );

  // Filter requests
  const pendingRequests = allRequests.filter(
    req => (req.requesterId === currentUser.id || req.ownerId === currentUser.id) && req.status === 'pending'
  );

  // Filter completed returns
  const completedReturns = returnHistory.filter(
    h => h.senderId === currentUser.id || h.receiverId === currentUser.id
  );

  // Find matches
  const foundItems = allItems.filter(item => item.type === 'found');
  const matches = findAllMatchesForUser(myLostItems, foundItems).slice(0, 5);

  // Recent activities
  const recentItems = allItems
    .filter(item => item.userId === currentUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div>
      <PageHeader
        title={`สวัสดี, ${currentUser.name}`}
        description="ภาพรวมของรายการและกิจกรรมของคุณ"
      />

      {/* Search Bar */}
      <div className="card mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาสิ่งของ..."
              className="input pl-10"
              onFocus={() => navigate('/search')}
            />
          </div>
          <button className="btn-primary whitespace-nowrap">
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline ml-2">ค้นหา</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => navigate('/my/lost-items/create')}
          className="card hover:shadow-lg transition-all text-left group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">แจ้งของหาย</h3>
              <p className="text-sm text-slate-600">รายงานสิ่งของที่สูญหาย</p>
            </div>
            <Plus className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </div>
        </button>

        <button
          onClick={() => navigate('/my/found-items/create')}
          className="card hover:shadow-lg transition-all text-left group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
              <Package className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">แจ้งของที่พบ</h3>
              <p className="text-sm text-slate-600">รายงานสิ่งของที่เจอ</p>
            </div>
            <Plus className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </div>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="รายการของหาย"
          value={myLostItems.length}
          icon={AlertCircle}
          color="bg-red-500"
          link="/my/lost-items"
        />
        <StatCard
          title="รายการของพบ"
          value={myFoundItems.length}
          icon={Package}
          color="bg-emerald-500"
          link="/my/found-items"
        />
        <StatCard
          title="คำขอรอดำเนินการ"
          value={pendingRequests.length}
          icon={FileText}
          color="bg-amber-500"
          link="/requests"
        />
        <StatCard
          title="คืนสำเร็จ"
          value={completedReturns.length}
          icon={CheckCircle}
          color="bg-green-500"
          link="/history"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Matches */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">รายการที่อาจตรงกัน</h2>
            <Link to="/search" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              ดูทั้งหมด →
            </Link>
          </div>

          {matches.length > 0 ? (
            <div className="space-y-3">
              {matches.map((match) => {
                const lostItem = allItems.find(i => i.id === match.lostItemId);
                const foundItem = allItems.find(i => i.id === match.foundItemId);
                if (!lostItem || !foundItem) return null;

                return (
                  <Link
                    key={match.id}
                    to={`/matching/${lostItem.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <img
                      src={foundItem.images[0]}
                      alt={foundItem.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{foundItem.title}</p>
                      <p className="text-sm text-slate-600 truncate">{getCategoryLabel(foundItem.category)}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-600 font-semibold">{match.score}%</div>
                      <div className="text-xs text-slate-500">ตรงกัน</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={TrendingUp}
              title="ยังไม่มีรายการที่ตรงกัน"
              description="เมื่อมีรายการที่อาจตรงกับของหายของคุณ จะแสดงที่นี่"
            />
          )}
        </div>

        {/* Recent Activities */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">กิจกรรมล่าสุด</h2>
          </div>

          {recentItems.length > 0 ? (
            <div className="space-y-3">
              {recentItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/items/${item.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.type === 'lost' ? 'bg-red-100' : 'bg-emerald-100'
                  }`}>
                    {item.type === 'lost' ? (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    ) : (
                      <Package className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{item.title}</p>
                    <p className="text-sm text-slate-600">{formatRelativeTime(item.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Package}
              title="ยังไม่มีกิจกรรม"
              description="เริ่มต้นด้วยการแจ้งของหายหรือของที่พบ"
            />
          )}
        </div>
      </div>
    </div>
  );
};
