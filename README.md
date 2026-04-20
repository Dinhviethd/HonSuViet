
# Hồn Sử Việt (HonSuViet)

**Hồn Sử Việt** là một dự án ứng dụng web giáo dục được thiết kế nhằm mục đích lan tỏa và truyền cảm hứng học tập Lịch sử Việt Nam. Dự án cung cấp các bài học lịch sử, hệ thống trắc nghiệm, các câu chuyện dân gian, giai thoại về danh nhân và kết hợp hệ thống Gamification (trò chơi hóa) để mang lại trải nghiệm học tập sinh động, hấp dẫn.

## ✨ Các tính năng nổi bật (Dự kiến)

* ** Khám phá Lịch sử:** Cung cấp tài liệu, truyện dân gian, danh nhân và tư liệu về các triều đại lịch sử Việt Nam.
* ** Hệ thống bài học:** Các chương và bài học được sắp xếp khoa học, tích hợp đa phương tiện (video, hình ảnh).
* ** Trắc nghiệm & Đánh giá (Quiz):** Người dùng có thể làm bài kiểm tra để ôn tập kiến thức lịch sử.
* ** Gamification:** Tích hợp hệ thống điểm kinh nghiệm (XP), cấp độ (Level) và bảng thành tích giúp tạo động lực học tập. (In development)
* ** Diễn đàn & Cộng đồng:** Nơi người dùng có thể thảo luận và chia sẻ kiến thức lịch sử. (In development)

## Công nghệ sử dụng

Dự án được xây dựng theo mô hình Client-Server với các công nghệ hiện đại:

### Frontend (Client)
* **Core:** React (v19), TypeScript, Vite.
* **Styling:** Tailwind CSS, Radix UI (Shadcn UI components), Framer Motion, Class Variance Authority.
* **State Management:** Zustand.
* **Routing:** React Router DOM.
* **Utilities:** Axios (gọi API), React-slick & Embla-carousel (cho slider/carousel), Recharts (vẽ biểu đồ), Zod (kiểm tra dữ liệu).

### Backend (Server)
* **Core:** Node.js, Express, TypeScript.
* **Database & ORM:** TypeORM (hỗ trợ MySQL/PostgreSQL).
* **Authentication:** JSON Web Token (JWT), Bcryptjs.
* **Real-time:** Socket.io.
* **File Upload:** Multer, Cloudinary.
* **Emailing:** Nodemailer.

## 🚀 Hướng dẫn cài đặt và chạy dự án

### 1. Yêu cầu môi trường
* Node.js (phiên bản mới nhất được khuyến nghị)
* MySQL hoặc PostgreSQL
* Trình quản lý gói: `npm` hoặc `yarn`

### 2. Cài đặt Backend (Server)
Di chuyển vào thư mục `server` và thực hiện các bước sau:
```bash
cd server
npm install   # Cài đặt các thư viện phụ thuộc
```
* Tạo file `.env` dựa trên `.env.example` và thiết lập các biến môi trường (Database, JWT, Cloudinary...).
* Chạy các lệnh Database:
```bash
npm run migration:run  # Chạy migration để tạo bảng trong DB
npm run seed           # (Tùy chọn) Khởi tạo dữ liệu mẫu
```
* Khởi chạy server trong môi trường phát triển:
```bash
npm run dev   # Server sẽ chạy bằng nodemon + ts-node
```

### 3. Cài đặt Frontend (Client)
Mở một terminal mới, di chuyển vào thư mục `client` và thực hiện:
```bash
cd client
npm install   # Cài đặt các thư viện UI và React
```
* Khởi chạy ứng dụng web:
```bash
npm run dev   # Chạy Vite dev server
```

### 4. Xây dựng cho môi trường Production
* **Client:** Chạy lệnh `npm run build` để TypeScript biên dịch và Vite đóng gói source code tĩnh.
* **Server:** Chạy lệnh `npm run build` để biên dịch mã TypeScript sang JavaScript (thư mục `dist`).

## License
Dự án được phân phối dưới giấy phép ISC.
