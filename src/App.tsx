import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastProvider } from './components/common/Toast';
import { UserLayout } from './layouts/UserLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { Dashboard } from './pages/dashboard/Dashboard';
import { getCurrentUser } from './data/mockUsers';
import { initializeStorage } from './services/storageService';
import { mockLostItems, mockFoundItems } from './data/mockItems';
import { mockRequests } from './data/mockRequests';
import { mockNotifications } from './data/mockNotifications';

// Lazy load pages (we'll create these)
import { SearchPage } from './pages/search/SearchPage';
import { ItemDetailPage } from './pages/items/ItemDetailPage';
import { MyLostItemsPage } from './pages/lost-items/MyLostItemsPage';
import { CreateLostItemPage } from './pages/lost-items/CreateLostItemPage';
import { MyFoundItemsPage } from './pages/found-items/MyFoundItemsPage';
import { CreateFoundItemPage } from './pages/found-items/CreateFoundItemPage';
import { RequestsPage } from './pages/requests/RequestsPage';
import { RequestDetailPage } from './pages/requests/RequestDetailPage';
import { ReturnsPage } from './pages/returns/ReturnsPage';
import { ReturnDetailPage } from './pages/returns/ReturnDetailPage';
import { QRCodePage } from './pages/returns/QRCodePage';
import { ScanQRPage } from './pages/returns/ScanQRPage';
import { HistoryPage } from './pages/history/HistoryPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { MatchingPage } from './pages/matching/MatchingPage';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminItemsPage } from './pages/admin/AdminItemsPage';
import { AdminRequestsPage } from './pages/admin/AdminRequestsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';

// 404 Page
import { NotFoundPage } from './pages/NotFoundPage';

// Protected Route Component
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = getCurrentUser();
  if (currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function App() {
  useEffect(() => {
    // Initialize storage with mock data
    initializeStorage(
      [...mockLostItems, ...mockFoundItems],
      mockRequests,
      mockNotifications
    );
  }, []);

  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          {/* User Routes */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/matching/:lostItemId" element={<MatchingPage />} />
            <Route path="/items/:itemId" element={<ItemDetailPage />} />
            <Route path="/my/lost-items" element={<MyLostItemsPage />} />
            <Route path="/my/lost-items/create" element={<CreateLostItemPage />} />
            <Route path="/my/lost-items/:id/edit" element={<CreateLostItemPage />} />
            <Route path="/my/found-items" element={<MyFoundItemsPage />} />
            <Route path="/my/found-items/create" element={<CreateFoundItemPage />} />
            <Route path="/my/found-items/:id/edit" element={<CreateFoundItemPage />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/requests/:requestId" element={<RequestDetailPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/returns/:returnId" element={<ReturnDetailPage />} />
            <Route path="/returns/:returnId/qr" element={<QRCodePage />} />
            <Route path="/scan-qr" element={<ScanQRPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Admin Routes */}
          <Route
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/items" element={<AdminItemsPage />} />
            <Route path="/admin/requests" element={<AdminRequestsPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/audit-logs" element={<AdminAuditLogsPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
