# Lost & Found Matching System

ระบบแจ้งของหาย-ของพบ พร้อมระบบจับคู่ Matching Score และกระบวนการส่งคืนสิ่งของแบบครบวงจร

## 🎯 Features

### User Features
- ✅ **Dashboard** - ภาพรวมรายการและกิจกรรม พร้อม Quick Actions
- ✅ **ค้นหาสิ่งของ** - Search และ Filter ขั้นสูง
- ✅ **Matching System** - จับคู่ของหายกับของพบด้วย Mock Score
- ✅ **แจ้งของหาย/ของพบ** - Form ครบถ้วน มี Validation
- ✅ **คำขอรับคืน** - Workflow การขอรับคืนสิ่งของ
- ✅ **กระบวนการส่งคืน** - Timeline และ Status Tracking
- ✅ **QR Code** - Generate และ Scan QR สำหรับยืนยันการรับสิ่งของ
- ✅ **ประวัติการคืน** - บันทึกรายการที่คืนสำเร็จ
- ✅ **การแจ้งเตือน** - Notification Center พร้อม Badge
- ✅ **โปรไฟล์** - จัดการข้อมูลส่วนตัว

### Admin Features
- ✅ **Admin Dashboard** - สถิติและ Analytics พร้อม Charts
- ✅ **จัดการรายการ** - ดูและจัดการของหาย/ของพบทั้งหมด
- ✅ **จัดการคำขอรับคืน** - ติดตามสถานะคำขอทั้งหมด
- ✅ **จัดการผู้ใช้** - ดูข้อมูลผู้ใช้ในระบบ
- ✅ **Audit Logs** - บันทึกกิจกรรม

### Technical Features
- ✅ **Responsive Design** - ใช้งานได้ทั้ง Desktop, Tablet, Mobile
- ✅ **LocalStorage** - ข้อมูลคงอยู่หลัง Reload
- ✅ **Role Switching** - สลับระหว่าง User และ Admin
- ✅ **Toast Notifications** - แจ้งเตือนการทำงาน
- ✅ **Modal Confirmations** - ยืนยันก่อนทำ Action สำคัญ
- ✅ **Empty States** - UI สำหรับกรณีไม่มีข้อมูล
- ✅ **Loading States** - Skeleton Loading
- ✅ **404 Page** - หน้า Not Found ที่สวยงาม

## 🚀 Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **Recharts** - Dashboard Charts
- **QRCode.react** - QR Code Generation

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

**Theme:** Emerald Green + White + Slate Gray

- **Primary:** Emerald Green (#10b981)
- **Background:** #F8FAFC
- **Surface:** White
- **Text:** Slate 800
- **Muted:** Slate 500

**Components:**
- Modern cards with rounded corners
- Soft shadows
- Clean typography
- Consistent spacing
- Hover/Focus/Active states

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── items/           # Item-related components
│   └── layout/          # Layout components
├── layouts/
│   ├── UserLayout.tsx   # User interface layout
│   └── AdminLayout.tsx  # Admin interface layout
├── pages/
│   ├── dashboard/       # Dashboard page
│   ├── search/          # Search page
│   ├── items/           # Item detail page
│   ├── matching/        # Matching results page
│   ├── lost-items/      # Lost items management
│   ├── found-items/     # Found items management
│   ├── requests/        # Return requests
│   ├── returns/         # Return process
│   ├── history/         # Return history
│   ├── notifications/   # Notifications center
│   ├── profile/         # User profile
│   └── admin/           # Admin pages
├── data/                # Mock data
├── services/            # Business logic
├── types/               # TypeScript types
└── utils/               # Helper functions
```

## 🔐 Demo Accounts

### User Account
- Default login (no actual auth in demo)
- Can create lost/found items
- Can request returns
- Can scan QR codes

### Admin Account
- Switch role via header menu
- Full system visibility
- Analytics dashboard
- User management

## ⚠️ Important Notes

### Demo Limitations

**Matching System:**
- ใช้ Mock Score คำนวณจากข้อความ, หมวดหมู่, วันที่, สถานที่
- **ไม่ใช่ AI หรือ Image Recognition จริง**
- ในระบบจริงควรใช้ ML Model

**QR Code Security:**
- QR Code ใน Demo เป็นแค่ String
- **ไม่ได้ป้องกันการใช้ซ้ำอย่างปลอดภัย**
- ในระบบจริงต้องมี Backend ตรวจสอบ Token และ expiry

**Access Control:**
- Role Switcher เป็นเพียง UI Demo
- **ไม่ใช่ระบบรักษาความปลอดภัยจริง**
- ในระบบจริงต้องตรวจสอบสิทธิ์ที่ Backend

**Data Persistence:**
- ใช้ LocalStorage เท่านั้น
- ข้อมูลหายเมื่อ Clear Browser Data
- ไม่มี Sync ข้ามอุปกรณ์

## 🎯 Workflow Example

### 1. แจ้งของหาย
1. ไปที่ "แจ้งของหาย"
2. กรอกข้อมูล (ชื่อ, หมวดหมู่, รายละเอียด, วันที่, สถานที่)
3. เพิ่มรูปภาพ (URL)
4. บันทึก

### 2. ค้นหาและ Matching
1. ระบบจับคู่ของหายกับของพบโดยอัตโนมัติ
2. ดูรายการที่ตรงกันพร้อม Score
3. ดู Breakdown ของ Score แต่ละส่วน

### 3. ขอรับคืน
1. เลือกของที่ต้องการ
2. กดขอรับคืน
3. กรอกข้อมูลยืนยันความเป็นเจ้าของ
4. รอการยืนยันจากผู้พบ

### 4. ยืนยันคำขอ
1. ผู้พบได้รับการแจ้งเตือน
2. ตรวจสอบข้อมูลยืนยัน
3. ยืนยันหรือปฏิเสธคำขอ

### 5. ส่งคืนสิ่งของ
1. หลังยืนยัน สร้าง Return Process
2. แสดงข้อมูลติดต่อ
3. สร้าง QR Code
4. นัดหมายและส่งคืน
5. Scan QR เพื่อยืนยัน
6. บันทึกเข้าประวัติ

## 📱 Pages & Routes

### User Routes
- `/` - Dashboard
- `/search` - ค้นหาสิ่งของ
- `/matching/:lostItemId` - ผลการจับคู่
- `/items/:itemId` - รายละเอียดสิ่งของ
- `/my/lost-items` - รายการของหาย
- `/my/lost-items/create` - แจ้งของหาย
- `/my/lost-items/:id/edit` - แก้ไขของหาย
- `/my/found-items` - รายการของพบ
- `/my/found-items/create` - แจ้งของพบ
- `/my/found-items/:id/edit` - แก้ไขของพบ
- `/requests` - คำขอรับคืน
- `/requests/:requestId` - รายละเอียดคำขอ
- `/returns` - การส่งคืน
- `/returns/:returnId` - รายละเอียดการส่งคืน
- `/returns/:returnId/qr` - QR Code
- `/scan-qr` - สแกน QR
- `/history` - ประวัติการคืน
- `/notifications` - การแจ้งเตือน
- `/profile` - โปรไฟล์

### Admin Routes
- `/admin` - Admin Dashboard
- `/admin/items` - จัดการรายการ
- `/admin/requests` - คำขอรับคืนทั้งหมด
- `/admin/users` - จัดการผู้ใช้
- `/admin/audit-logs` - Audit Logs

## 🔨 Development

### Mock Data
- **Items:** 10 lost + 10 found (mockItems.ts)
- **Requests:** 6 requests (mockRequests.ts)
- **Notifications:** 8 notifications (mockNotifications.ts)
- **Users:** 5 users (mockUsers.ts)

### Categories
- อุปกรณ์อิเล็กทรอนิกส์
- กระเป๋า
- เอกสาร
- เครื่องเขียน
- กุญแจ
- เสื้อผ้า
- อื่นๆ

## 🚀 Production Readiness

### ต้องเพิ่มก่อนใช้งานจริง:

1. **Backend API**
   - RESTful API หรือ GraphQL
   - Database (PostgreSQL, MongoDB, etc.)
   - Authentication & Authorization (JWT, OAuth)
   - File Upload Service (S3, Cloudinary)

2. **Real Matching Algorithm**
   - Text Similarity (TF-IDF, BERT)
   - Image Recognition (CNN, Vision API)
   - Geolocation Matching
   - Time-based weighting

3. **Security**
   - HTTPS
   - CSRF Protection
   - Rate Limiting
   - Input Sanitization
   - Secure QR Token with expiry
   - Permission checks at API level

4. **Features**
   - Real-time updates (WebSocket)
   - Email/SMS notifications
   - Image optimization
   - Search optimization (Elasticsearch)
   - Caching (Redis)

5. **DevOps**
   - CI/CD Pipeline
   - Error Tracking (Sentry)
   - Analytics (Google Analytics, Mixpanel)
   - Performance Monitoring
   - Logging (ELK Stack)

## 📝 License

This is a demo project for educational purposes.

## 👨‍💻 Author

Built with ❤️ using React, TypeScript, and Tailwind CSS

---

**Note:** This is a frontend-only demo. For production use, implement proper backend, authentication, and security measures.
