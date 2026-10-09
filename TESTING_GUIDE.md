# Testing Guide - Lost & Found System

## 🧪 Quick Start Testing

### 1. เริ่มต้น
1. เปิด `http://localhost:5173/`
2. คุณจะเห็น Dashboard พร้อม Mock Data

### 2. ทดสอบ User Workflow

#### A. แจ้งของหาย
1. คลิก "แจ้งของหาย" หรือไปที่ `/my/lost-items/create`
2. กรอกข้อมูล:
   - ชื่อสิ่งของ: "กระเป๋าหนังสีดำ"
   - หมวดหมู่: เลือก "กระเป๋า"
   - สี: "ดำ"
   - รายละเอียด: "กระเป๋าหนัง Louis Vuitton มีบัตรเครดิตข้างใน"
   - วันที่: เลือกวันที่ล่าสุด
   - สถานที่: "BTS สยาม"
3. คลิก "+" เพื่อเพิ่มรูป (ใส่ URL: https://images.unsplash.com/photo-1627123424574-724758594e93?w=400)
4. คลิก "บันทึกรายการ"
5. ✅ ควรเห็น Toast "บันทึกรายการเรียบร้อยแล้ว"
6. ✅ Redirect ไปหน้า My Lost Items

#### B. ดู Matching
1. ไปที่ Dashboard
2. ดูส่วน "รายการที่อาจตรงกัน"
3. คลิกดูรายการ Matching
4. ✅ ควรเห็น Matching Score และ Breakdown

#### C. ขอรับคืนสิ่งของ
1. ไปที่ "ค้นหาสิ่งของ" (Search)
2. คลิกดูรายการของพบ
3. คลิก "ขอรับคืนสิ่งของ"
4. กรอกข้อมูลยืนยัน: "มีบัตรเครดิตธนาคารกสิกรชื่อ สมชาย"
5. ส่งคำขอ
6. ✅ ควรเห็น Toast สำเร็จ
7. ไปที่ "คำขอรับคืน" > Tab "คำขอที่ฉันส่ง"
8. ✅ ควรเห็นคำขอใหม่

### 3. ทดสอบ Admin Workflow

#### A. สลับเป็น Admin
1. คลิกที่ Avatar มุมขวาบน
2. เลือก "สลับโหมด (Admin)"
3. ยืนยัน
4. ✅ หน้าจะ Reload และแสดง Admin Navigation

#### B. ดู Admin Dashboard
1. ควรเห็นหน้า Admin Dashboard อัตโนมัติ
2. ✅ ตรวจสอบ:
   - Stat Cards แสดงตัวเลขถูกต้อง
   - Charts แสดงผล
   - ตารางรายการล่าสุด

#### C. จัดการรายการ
1. ไปที่ "จัดการรายการ"
2. สลับ Tab ระหว่าง "ของหาย" และ "ของพบ"
3. ใช้ Search
4. ✅ ตรวจสอบการ Filter ทำงาน

#### D. ดูคำขอรับคืน
1. ไปที่ "คำขอรับคืน"
2. ✅ เห็นคำขอทั้งหมดในระบบ

### 4. ทดสอบ Return Workflow

#### A. ยืนยันคำขอ (Admin/Owner)
1. สลับกลับเป็น User (หรือใช้ Browser อื่น)
2. ไปที่ "คำขอรับคืน" > Tab "คำขอที่ฉันได้รับ"
3. เลือกคำขอที่รอการยืนยัน
4. คลิก "ยืนยันคำขอ"
5. ✅ Status เปลี่ยนเป็น "ยืนยันแล้ว"
6. ✅ เห็นข้อมูลติดต่อ

#### B. ดู Return Process
1. ไปที่ "การส่งคืน"
2. เลือกรายการที่ยืนยันแล้ว
3. ✅ เห็น Timeline
4. ✅ เห็นข้อมูลผู้ส่ง/ผู้รับ

#### C. สร้าง QR Code
1. ในหน้า Return Detail คลิก "ดู QR Code"
2. ✅ เห็น QR Code
3. ✅ เห็นรหัสอ้างอิง

#### D. สแกน QR (Confirm Return)
1. คัดลอกรหัสอ้างอิง
2. ไปที่ Navigation > "การส่งคืน" (หรือ `/scan-qr` โดยตรง)
3. หรือสามารถไปที่ Sidebar เลือก "การส่งคืน" แล้วเลือก "Scan QR"
4. วางรหัสอ้างอิง
5. คลิก "ยืนยันการรับสิ่งของ"
6. ✅ เห็นหน้ายืนยันสำเร็จ
7. ไปที่ "ประวัติการคืน"
8. ✅ เห็นรายการใหม่

### 5. ทดสอบ Notifications

#### A. ดูการแจ้งเตือน
1. คลิก Bell Icon มุมขวาบน
2. ✅ เห็นจำนวน Unread
3. คลิกเข้าไปดู
4. คลิกที่ Notification
5. ✅ Redirect ไปหน้าที่เกี่ยวข้อง
6. ✅ Status เปลี่ยนเป็นอ่านแล้ว

#### B. Mark All as Read
1. คลิก "อ่านทั้งหมด"
2. ✅ Badge หาย
3. ✅ ทุก Notification เป็นสีปกติ

### 6. ทดสอบ Search & Filter

#### A. Basic Search
1. ไปที่ "ค้นหาสิ่งของ"
2. พิมพ์ "iPhone"
3. คลิก "ค้นหา"
4. ✅ เห็นเฉพาะรายการที่มี iPhone

#### B. Advanced Filters
1. คลิก "ตัวกรอง"
2. เลือกหมวดหมู่: "อุปกรณ์อิเล็กทรอนิกส์"
3. เลือกวันที่
4. ระบุสถานที่: "เซ็นทรัล"
5. คลิก "ค้นหา"
6. ✅ ผลลัพธ์ถูกกรองตาม Filter
7. คลิก "ล้างตัวกรอง"
8. ✅ กลับมาแสดงทั้งหมด

### 7. ทดสอบ Responsive Design

#### A. Mobile View
1. เปิด DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. เลือก Mobile Device
4. ✅ Sidebar กลายเป็น Drawer
5. ✅ Layout responsive
6. ✅ Navigation ใช้งานได้

#### B. Tablet View
1. เลือก iPad ใน DevTools
2. ✅ Layout ปรับตาม breakpoint
3. ✅ Grid columns ลดลง

### 8. ทดสอบ LocalStorage

#### A. Data Persistence
1. สร้างรายการใหม่
2. Reload หน้า (F5)
3. ✅ ข้อมูลยังอยู่

#### B. Clear Data
1. เปิด DevTools > Application > Local Storage
2. ลบ keys ที่ขึ้นต้นด้วย "lf_"
3. Reload
4. ✅ กลับมาใช้ Mock Data

### 9. ทดสอบ Edge Cases

#### A. Empty States
1. ไปที่ "ประวัติการคืน" (ถ้ายังไม่มีข้อมูล)
2. ✅ เห็น Empty State ที่สวยงาม

#### B. Form Validation
1. ไปที่ "แจ้งของหาย"
2. ลองกดบันทึกโดยไม่กรอกข้อมูล
3. ✅ เห็น Error Messages
4. ✅ Toast แสดง "กรุณากรอกข้อมูลให้ครบถ้วน"

#### C. 404 Page
1. ไปที่ `/random-page-not-exists`
2. ✅ เห็นหน้า 404 ที่สวยงาม
3. คลิก "กลับหน้าหลัก"
4. ✅ Redirect ไปหน้า Dashboard

### 10. ทดสอบ User Experience

#### A. Loading States
1. สังเกต Loading Skeleton เมื่อเปลี่ยนหน้า
2. ✅ มี Loading indicator

#### B. Hover States
1. Hover เหนือ Card ต่างๆ
2. ✅ มี Hover effect
3. ✅ Shadow เพิ่มขึ้น

#### C. Toast Messages
1. ทำ Action ต่างๆ (Create, Update, Delete)
2. ✅ เห็น Toast notification
3. ✅ Toast หายอัตโนมัติหลัง 4 วินาที

## 🐛 Known Issues & Limitations

### Demo Limitations
1. **Matching Score** - เป็น Mock algorithm ไม่ใช่ AI จริง
2. **QR Security** - ไม่มีการป้องกันการใช้ซ้ำที่ปลอดภัย
3. **Authentication** - ไม่มี real auth, เป็นแค่ Role Switcher
4. **Image Upload** - ใช้ URL แทนการ upload จริง
5. **Real-time** - ไม่มี WebSocket, ต้อง refresh เอง
6. **Pagination** - แสดงทั้งหมด ไม่มี pagination จริง

### Expected Behavior
- ข้อมูล Mock มี 10 lost items, 10 found items
- Matching score คำนวณจาก: text (30%), category (25%), date (20%), location (15%), image (10%)
- QR Code จะไม่สามารถใช้ซ้ำได้ใน LocalStorage (แต่ไม่ปลอดภัยใน Production)
- Contact info แสดงเฉพาะเมื่อคำขอได้รับการยืนยัน

## ✅ Test Checklist

- [ ] Dashboard โหลดสำเร็จ
- [ ] สร้างของหายได้
- [ ] สร้างของพบได้
- [ ] Search และ Filter ทำงาน
- [ ] Matching แสดงผล
- [ ] ส่งคำขอรับคืนได้
- [ ] ยืนยัน/ปฏิเสธคำขอได้
- [ ] สร้าง QR Code ได้
- [ ] Scan QR และยืนยันการรับได้
- [ ] เห็นประวัติการคืน
- [ ] Notification ทำงาน
- [ ] สลับ Admin mode ได้
- [ ] Admin Dashboard แสดงผล
- [ ] Charts ใน Admin แสดงผล
- [ ] Responsive ทำงานทุก breakpoint
- [ ] LocalStorage บันทึกข้อมูล
- [ ] Toast notifications แสดง
- [ ] 404 page แสดง

## 🎓 Testing Tips

1. **ใช้ DevTools Console** - ดู errors หรือ warnings
2. **Test ทั้ง User และ Admin** - สลับ role เพื่อทดสอบ
3. **Test Responsive** - ลอง resize browser
4. **Clear LocalStorage** - เริ่มต้นใหม่เมื่อต้องการ
5. **Check Network Tab** - ดูว่าไม่มี API calls (เพราะเป็น frontend only)

Happy Testing! 🚀
