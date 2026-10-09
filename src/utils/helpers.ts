import { Category, ItemStatus, RequestStatus, ReturnStatus } from '../types';

// Format date to Thai locale
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format date and time
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format relative time
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMins < 1) return 'เมื่อสักครู่';
  if (diffMins < 60) return `${diffMins} นาทีที่แล้ว`;
  if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`;
  if (diffDays < 30) return `${diffDays} วันที่แล้ว`;
  return formatDate(dateString);
};

// Get category label
export const getCategoryLabel = (category: Category): string => {
  const labels: Record<Category, string> = {
    electronics: 'อุปกรณ์อิเล็กทรอนิกส์',
    bag: 'กระเป๋า',
    documents: 'เอกสาร',
    stationery: 'เครื่องเขียน',
    keys: 'กุญแจ',
    clothing: 'เสื้อผ้า',
    other: 'อื่นๆ'
  };
  return labels[category] || category;
};

// Get status label
export const getStatusLabel = (status: ItemStatus): string => {
  const labels: Record<ItemStatus, string> = {
    searching: 'กำลังค้นหา',
    found: 'พบของแล้ว',
    in_return_process: 'กำลังดำเนินการส่งคืน',
    returned: 'คืนเรียบร้อยแล้ว'
  };
  return labels[status] || status;
};

// Get request status label
export const getRequestStatusLabel = (status: RequestStatus): string => {
  const labels: Record<RequestStatus, string> = {
    pending: 'รอการยืนยัน',
    approved: 'ยืนยันแล้ว',
    rejected: 'ปฏิเสธ',
    cancelled: 'ยกเลิก'
  };
  return labels[status] || status;
};

// Get return status label
export const getReturnStatusLabel = (status: ReturnStatus): string => {
  const labels: Record<ReturnStatus, string> = {
    pending: 'รอการยืนยัน',
    confirmed: 'ยืนยันแล้ว',
    coordinating: 'กำลังประสานงาน',
    qr_generated: 'พร้อมส่งคืน',
    completed: 'เสร็จสิ้น'
  };
  return labels[status] || status;
};

// Get status color
export const getStatusColor = (status: ItemStatus): string => {
  const colors: Record<ItemStatus, string> = {
    searching: 'bg-blue-100 text-blue-800',
    found: 'bg-green-100 text-green-800',
    in_return_process: 'bg-amber-100 text-amber-800',
    returned: 'bg-slate-100 text-slate-800'
  };
  return colors[status] || 'bg-slate-100 text-slate-800';
};

// Get request status color
export const getRequestStatusColor = (status: RequestStatus): string => {
  const colors: Record<RequestStatus, string> = {
    pending: 'bg-amber-100 text-amber-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    cancelled: 'bg-slate-100 text-slate-800'
  };
  return colors[status] || 'bg-slate-100 text-slate-800';
};

// Get return status color
export const getReturnStatusColor = (status: ReturnStatus): string => {
  const colors: Record<ReturnStatus, string> = {
    pending: 'bg-amber-100 text-amber-800',
    confirmed: 'bg-blue-100 text-blue-800',
    coordinating: 'bg-purple-100 text-purple-800',
    qr_generated: 'bg-emerald-100 text-emerald-800',
    completed: 'bg-green-100 text-green-800'
  };
  return colors[status] || 'bg-slate-100 text-slate-800';
};

// Generate unique ID
export const generateId = (prefix: string): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Get all categories
export const getAllCategories = (): Category[] => {
  return ['electronics', 'bag', 'documents', 'stationery', 'keys', 'clothing', 'other'];
};

// Check if user owns item
export const isItemOwner = (item: { userId: string }, currentUserId: string): boolean => {
  return item.userId === currentUserId;
};
