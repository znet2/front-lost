export type ItemType = 'lost' | 'found';

export type ItemStatus = 'searching' | 'found' | 'in_return_process' | 'returned';

export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export type ReturnStatus = 'pending' | 'confirmed' | 'coordinating' | 'qr_generated' | 'completed';

export type UserRole = 'user' | 'admin';

export type Category = 
  | 'electronics'
  | 'bag'
  | 'documents'
  | 'stationery'
  | 'keys'
  | 'clothing'
  | 'other';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface Item {
  id: string;
  type: ItemType;
  title: string;
  category: Category;
  color?: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  images: string[];
  additionalDetails?: string;
  status: ItemStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MatchingResult {
  id: string;
  lostItemId: string;
  foundItemId: string;
  score: number;
  breakdown: {
    textSimilarity: number;
    category: number;
    dateTime: number;
    location: number;
    image: number;
  };
  createdAt: string;
}

export interface ReturnRequest {
  id: string;
  itemId: string;
  itemType: ItemType;
  requesterId: string;
  ownerId: string;
  status: RequestStatus;
  verificationDetails?: string;
  verificationImages?: string[];
  createdAt: string;
  updatedAt: string;
  response?: {
    message: string;
    date: string;
  };
}

export interface ReturnProcess {
  id: string;
  requestId: string;
  itemId: string;
  senderId: string;
  receiverId: string;
  status: ReturnStatus;
  meetingDate?: string;
  meetingLocation?: string;
  qrCode?: string;
  qrUsed: boolean;
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  status: 'completed' | 'current' | 'pending';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'match_found' | 'item_claimed' | 'request_received' | 'request_approved' | 'request_rejected' | 'item_confirmed' | 'return_completed';
  title: string;
  message: string;
  read: boolean;
  relatedId?: string;
  relatedType?: 'item' | 'request' | 'return';
  createdAt: string;
}

export interface ReturnHistory {
  id: string;
  returnId: string;
  itemId: string;
  itemTitle: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  completedDate: string;
  status: 'completed' | 'cancelled';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  entityType: 'item' | 'request' | 'return' | 'user';
  entityId: string;
  result: 'success' | 'failed';
  details?: string;
}

export interface DashboardStats {
  myLostItems: number;
  myFoundItems: number;
  pendingRequests: number;
  completedReturns: number;
}

export interface AdminStats {
  totalLostItems: number;
  totalFoundItems: number;
  totalRequests: number;
  totalReturns: number;
  itemsByCategory: Record<Category, number>;
  returnsByMonth: Array<{ month: string; lost: number; found: number }>;
}

export interface SearchFilters {
  query?: string;
  category?: Category;
  dateFrom?: string;
  dateTo?: string;
  location?: string;
  status?: ItemStatus;
}
