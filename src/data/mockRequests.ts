import { ReturnRequest } from '../types';

export const mockRequests: ReturnRequest[] = [
  {
    id: 'req-1',
    itemId: 'found-1',
    itemType: 'found',
    requesterId: 'user-1',
    ownerId: 'user-2',
    status: 'approved',
    verificationDetails: 'โทรศัพท์มีรูปภาพครอบครัวและแอพธนาคารที่ผมใช้',
    verificationImages: [],
    createdAt: '2024-03-15T16:00:00Z',
    updatedAt: '2024-03-16T10:00:00Z',
    response: {
      message: 'ยืนยันว่าเป็นของคุณ กรุณาติดต่อตามช่องทางที่แจ้งไว้',
      date: '2024-03-16T10:00:00Z'
    }
  },
  {
    id: 'req-2',
    itemId: 'found-2',
    itemType: 'found',
    requesterId: 'user-2',
    ownerId: 'user-3',
    status: 'pending',
    verificationDetails: 'กระเป๋าสตางค์มีบัตรประชาชนและบัตรเครดิตธนาคารกสิกร ชื่อสมหญิง รักสะอาด',
    createdAt: '2024-03-18T12:00:00Z',
    updatedAt: '2024-03-18T12:00:00Z'
  },
  {
    id: 'req-3',
    itemId: 'found-3',
    itemType: 'found',
    requesterId: 'user-1',
    ownerId: 'user-4',
    status: 'approved',
    verificationDetails: 'กุญแจรถ Toyota Camry สีเทา ทะเบียน กข 1234',
    createdAt: '2024-03-20T18:00:00Z',
    updatedAt: '2024-03-21T09:00:00Z',
    response: {
      message: 'ยืนยันแล้ว สามารถนัดรับได้ค่ะ',
      date: '2024-03-21T09:00:00Z'
    }
  },
  {
    id: 'req-4',
    itemId: 'found-5',
    itemType: 'found',
    requesterId: 'user-2',
    ownerId: 'user-1',
    status: 'rejected',
    verificationDetails: 'แว่นตากรอบทอง ยี่ห้อ Rayban',
    createdAt: '2024-03-25T15:00:00Z',
    updatedAt: '2024-03-25T16:00:00Z',
    response: {
      message: 'ขออภัย รายละเอียดไม่ตรงกับของที่เจอค่ะ',
      date: '2024-03-25T16:00:00Z'
    }
  },
  {
    id: 'req-5',
    itemId: 'found-7',
    itemType: 'found',
    requesterId: 'user-1',
    ownerId: 'user-2',
    status: 'pending',
    verificationDetails: 'AirPods Pro ซีเรียลหมายเลข ABCD1234',
    createdAt: '2024-03-28T17:00:00Z',
    updatedAt: '2024-03-28T17:00:00Z'
  },
  {
    id: 'req-6',
    itemId: 'found-10',
    itemType: 'found',
    requesterId: 'user-4',
    ownerId: 'user-1',
    status: 'approved',
    verificationDetails: 'บัตรนักศึกษา รหัส 6512345678 ชื่อ วิภาดา สุขใจ',
    createdAt: '2024-03-30T10:00:00Z',
    updatedAt: '2024-03-30T11:00:00Z',
    response: {
      message: 'ยืนยันแล้วค่ะ สามารถมารับได้ที่ห้องสมุด',
      date: '2024-03-30T11:00:00Z'
    }
  }
];
