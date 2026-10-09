import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  AlertCircle,
  Package,
  List,
  FileText,
  RotateCcw,
  History,
  Bell,
  User,
  Users,
  Shield,
  FileBarChart,
  X
} from 'lucide-react';
import { getCurrentUser } from '../../data/mockUsers';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const currentUser = getCurrentUser();
  const isAdmin = currentUser.role === 'admin';

  const userNavItems: NavItem[] = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/search', label: 'ค้นหาสิ่งของ', icon: <Search className="w-5 h-5" /> },
    { path: '/my/lost-items', label: 'รายการของหาย', icon: <AlertCircle className="w-5 h-5" /> },
    { path: '/my/found-items', label: 'รายการของพบ', icon: <Package className="w-5 h-5" /> },
    { path: '/requests', label: 'คำขอรับคืน', icon: <FileText className="w-5 h-5" /> },
    { path: '/returns', label: 'การส่งคืน', icon: <RotateCcw className="w-5 h-5" /> },
    { path: '/history', label: 'ประวัติการคืน', icon: <History className="w-5 h-5" /> },
    { path: '/notifications', label: 'การแจ้งเตือน', icon: <Bell className="w-5 h-5" /> },
    { path: '/profile', label: 'โปรไฟล์', icon: <User className="w-5 h-5" /> },
  ];

  const adminNavItems: NavItem[] = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/admin/items', label: 'จัดการรายการ', icon: <List className="w-5 h-5" /> },
    { path: '/admin/requests', label: 'คำขอรับคืน', icon: <FileText className="w-5 h-5" /> },
    { path: '/admin/users', label: 'ผู้ใช้งาน', icon: <Users className="w-5 h-5" /> },
    { path: '/admin/audit-logs', label: 'Audit Logs', icon: <FileBarChart className="w-5 h-5" /> },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:sticky lg:top-0 w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-slate-900">Lost & Found</span>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => onClose()}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Role Badge */}
          <div className="p-4 border-t border-slate-200">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              isAdmin ? 'bg-purple-50' : 'bg-slate-50'
            }`}>
              {isAdmin ? <Shield className="w-4 h-4 text-purple-600" /> : <User className="w-4 h-4 text-slate-600" />}
              <span className={`text-sm font-medium ${
                isAdmin ? 'text-purple-700' : 'text-slate-700'
              }`}>
                {isAdmin ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน'}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
