## YouTube-kich-ban

Nền tảng tạo kịch bản YouTube cho dịch vụ y tế/thẩm mỹ với tích hợp n8n, chatbot hỗ trợ soạn thảo và xuất dữ liệu ra Google Sheets.

Liên kết repo: [Longtran2404/YouTube-kich-ban](https://github.com/Longtran2404/YouTube-kich-ban)

### Tính năng chính
- Tạo kịch bản video theo mẫu cho nhiều dịch vụ khác nhau
- Tích hợp chatbot để gợi ý nội dung, tối ưu hook/CTA
- Kết nối n8n để tự động hóa quy trình (xuất Sheets, gửi Slack/Email, lên lịch)
- Xuất dữ liệu ra Google Sheets để cộng tác và lưu trữ
- Giao diện đơn giản, tập trung vào hiệu suất soạn thảo

### Kiến trúc & Thư mục
- `public/`: tài nguyên tĩnh
- `src/`: mã nguồn giao diện và logic
  - `components/`: các khối UI chính (ví dụ `MainTabs`)
  - `styles/`: định nghĩa CSS
- `.env.example`: biến môi trường mẫu

### Yêu cầu hệ thống
- Node.js >= 18
- npm >= 9
- Quyền truy cập một instance n8n (tùy chọn) và tài khoản Google (để dùng Google Sheets)

### Cấu hình môi trường
Sao chép file mẫu và điền thông tin phù hợp:

```bash
cp .env.example .env
# Chỉnh sửa .env theo môi trường của bạn
```

Một số biến gợi ý (tham khảo `.env.example`):
- `N8N_WEBHOOK_URL`: webhook của workflow trong n8n (nếu dùng tự động hóa)
- `GOOGLE_SHEETS_ID`: ID của Google Sheet đích
- `OPENAI_API_KEY` hoặc khóa chatbot tương ứng (nếu dùng chatbot)

### Cài đặt & Chạy
```bash
npm install
npm run dev
# Mở http://localhost:3000
```

Build sản phẩm:
```bash
npm run build
npm run start
```

### Tích hợp n8n (tùy chọn)
1) Tạo workflow nhận dữ liệu kịch bản (Webhook node)
2) Xử lý dữ liệu (ví dụ: chuẩn hóa, tạo hàng trong Google Sheets)
3) Trả kết quả hoặc đường dẫn Sheet về ứng dụng

Bạn có thể dùng `HTTP Request` trong ứng dụng để POST kịch bản sang `N8N_WEBHOOK_URL` hoặc cấu hình tại server tùy nhu cầu.

### Google Sheets
- Cấp quyền API cho tài khoản dịch vụ và chia sẻ Sheet
- Ghi dữ liệu mỗi kịch bản thành một dòng (tiêu đề, outline, script, CTA, tags…)

### Chatbot gợi ý nội dung
- Hỗ trợ gợi ý ý tưởng nhanh, tối ưu hook, mở rộng phần nội dung chưa đủ
- Có thể cấu hình nhà cung cấp model qua biến môi trường (xem `.env.example`)

### Quy ước mã nguồn
- Tên biến/hàm rõ nghĩa, dễ đọc
- Tách nhỏ component, tránh lồng quá sâu
- Tránh thêm logic phức tạp vào JSX; đưa vào helpers khi cần

### Đóng góp
- Tạo nhánh từ `main`
- Tuân theo Conventional Commits (ví dụ: `feat:`, `fix:`, `docs:`)
- Tạo Pull Request kèm mô tả thay đổi

### Giấy phép
MIT. Sử dụng tự do cho mục đích cá nhân và thương mại.


