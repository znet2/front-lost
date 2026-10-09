import { Notification } from '../types';

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'match_found',
    title: 'พบรายการที่อาจตรงกับของหาย',
    message: 'พบรายการ "มือถือ iPhone สีดำ" ที่อาจตรงกับของหายของคุณ (ความเข้ากัน 92%)',
    read: false,
    relatedId: 'found-1',
    relatedType: 'item',
    createdAt: '2024-03-15T15:20:00Z'
  },
  {
    id: 'notif-2',
    userId: 'user-2',
    type: 'request_received',
    title: 'มีคำขอรับคืนใหม่',
    message: 'สมชาย ใจดี ได้ส่งคำขอรับคืนสิ่งของ "มือถือ iPhone สีดำ"',
    read: false,
    relatedId: 'req-1',
    relatedType: 'request',
    createdAt: '2024-03-15T16:00:00Z'
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    type: 'request_approved',
    title: 'คำขอรับคืนได้รับการยืนยัน',
    message: 'คำขอรับคืน "มือถือ iPhone สีดำ" ได้รับการยืนยันแล้ว',
    read: true,
    relatedId: 'req-1',
    relatedType: 'request',
    createdAt: '2024-03-16T10:00:00Z'
  },
  {
    id: 'notif-4',
    userId: 'user-2',
    type: 'request_received',
    title: 'มีคำขอรับคืนใหม่',
    message: 'มีผู้ส่งคำขอรับคืน "กระเป๋าสตางค์หนัง" กรุณาตรวจสอบ',
    read: false,
    relatedId: 'req-2',
    relatedType: 'request',
    createdAt: '2024-03-18T12:00:00Z'
  },
  {
    id: 'notif-5',
    userId: 'user-1',
    type: 'match_found',
    title: 'พบรายการที่อาจตรงกับของหาย',
    message: 'พบรายการ "กุญแจรถ พร้อมพวงกุญแจ" ที่อาจตรงกับของหายของคุณ (ความเข้ากัน 88%)',
    read: true,
    relatedId: 'found-3',
    relatedType: 'item',
    createdAt: '2024-03-20T17:30:00Z'
  },
  {
    id: 'notif-6',
    userId: 'user-2',
    type: 'request_rejected',
    title: 'คำขอรับคืนถูกปฏิเสธ',
    message: 'คำขอรับคืน "แว่นตากรอบทอง" ไม่ได้รับการยืนยัน',
    read: true,
    relatedId: 'req-4',
    relatedType: 'request',
    createdAt: '2024-03-25T16:00:00Z'
  },
  {
    id: 'notif-7',
    userId: 'user-4',
    type: 'request_approved',
    title: 'คำขอรับคืนได้รับการยืนยัน',
    message: 'คำขอรับคืน "บัตรนักศึกษา" ได้รับการยืนยันแล้ว สามารถประสานงานการรับของได้',
    read: false,
    relatedId: 'req-6',
    relatedType: 'request',
    createdAt: '2024-03-30T11:00:00Z'
  },
  {
    id: 'notif-8',
    userId: 'user-1',
    type: 'return_completed',
    title: 'คืนสิ่งของสำเร็จ',
    message: 'รายการ "มือถือ iPhone สีดำ" ได้รับการคืนเรียบร้อยแล้ว',
    read: true,
    relatedId: 'return-1',
    relatedType: 'return',
    createdAt: '2024-03-17T14:00:00Z'
  }
];
