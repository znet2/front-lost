import { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'สมชาย ใจดี',
    email: 'somchai@example.com',
    phone: '081-234-5678',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Somchai',
    createdAt: '2024-01-15T10:00:00Z',
    status: 'active'
  },
  {
    id: 'user-2',
    name: 'สมหญิง รักสะอาด',
    email: 'somying@example.com',
    phone: '082-345-6789',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Somying',
    createdAt: '2024-01-20T11:30:00Z',
    status: 'active'
  },
  {
    id: 'user-3',
    name: 'นิรันดร์ มั่นคง',
    email: 'niran@example.com',
    phone: '083-456-7890',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Niran',
    createdAt: '2024-02-01T09:00:00Z',
    status: 'active'
  },
  {
    id: 'user-4',
    name: 'วิภาดา สุขใจ',
    email: 'wipada@example.com',
    phone: '084-567-8901',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wipada',
    createdAt: '2024-02-10T14:20:00Z',
    status: 'active'
  },
  {
    id: 'admin-1',
    name: 'ผู้ดูแลระบบ',
    email: 'admin@example.com',
    phone: '080-000-0000',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    createdAt: '2024-01-01T08:00:00Z',
    status: 'active'
  }
];

export const getCurrentUser = (): User => {
  const storedRole = localStorage.getItem('userRole') as 'user' | 'admin' || 'user';
  if (storedRole === 'admin') {
    return mockUsers[4]; // admin
  }
  return mockUsers[0]; // default user
};

export const setUserRole = (role: 'user' | 'admin') => {
  localStorage.setItem('userRole', role);
};
