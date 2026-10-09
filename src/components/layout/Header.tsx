import { Menu, Bell, User, LogOut, Settings, RefreshCw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, setUserRole } from '../../data/mockUsers';
import { getNotifications } from '../../services/storageService';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRoleSwitch, setShowRoleSwitch] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const notifications = getNotifications().filter(
    n => n.userId === currentUser.id && !n.read
  );
  const unreadCount = notifications.length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSwitch = () => {
    const newRole = currentUser.role === 'admin' ? 'user' : 'admin';
    setUserRole(newRole);
    setShowRoleSwitch(false);
    setShowUserMenu(false);
    window.location.href = newRole === 'admin' ? '/admin' : '/';
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    navigate('/profile');
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-600 hover:text-slate-900"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden lg:block">
          <h2 className="text-lg font-semibold text-slate-900">
            {currentUser.role === 'admin' ? 'ระบบจัดการ' : 'ยินดีต้อนรับ'}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Link
            to="/notifications"
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-slate-900">{currentUser.name}</p>
                <p className="text-xs text-slate-500">
                  {currentUser.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน'}
                </p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 animate-fade-in">
                <div className="px-4 py-3 border-b border-slate-200">
                  <p className="text-sm font-medium text-slate-900">{currentUser.name}</p>
                  <p className="text-xs text-slate-500">{currentUser.email}</p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <User className="w-4 h-4" />
                  โปรไฟล์
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Settings className="w-4 h-4" />
                  ตั้งค่า
                </Link>

                <div className="border-t border-slate-200 my-2" />

                <button
                  onClick={() => setShowRoleSwitch(true)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-50 w-full"
                >
                  <RefreshCw className="w-4 h-4" />
                  สลับโหมด ({currentUser.role === 'admin' ? 'User' : 'Admin'})
                </button>

                <div className="border-t border-slate-200 my-2" />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full"
                >
                  <LogOut className="w-4 h-4" />
                  ออกจากระบบ
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Role Switch Confirmation */}
      {showRoleSwitch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowRoleSwitch(false)} />
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">สลับโหมดการใช้งาน</h3>
            <p className="text-slate-600 mb-4">
              คุณต้องการสลับเป็นโหมด{' '}
              <strong>{currentUser.role === 'admin' ? 'ผู้ใช้งานทั่วไป' : 'ผู้ดูแลระบบ'}</strong>{' '}
              ใช่หรือไม่?
            </p>
            <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg mb-6">
              หมายเหตุ: การสลับโหมดเป็นการสาธิตเท่านั้น ในระบบจริงต้องมีการตรวจสอบสิทธิ์ที่ Backend
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowRoleSwitch(false)} className="btn-secondary">
                ยกเลิก
              </button>
              <button onClick={handleRoleSwitch} className="btn-primary">
                ยืนยันการสลับ
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
