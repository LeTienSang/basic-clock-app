# PRD — Product Requirements Document
# basic-clock-app

> **Phiên bản:** 1.0 (MVP)
> **Ngày tạo:** 2025
> **Tác giả:** Sang
> **Trạng thái:** Draft

---

## 1. Problem Statement

### 1.1 Vấn đề cần giải quyết

Người dùng cần một công cụ quản lý thời gian đơn giản, chạy hoàn toàn trên trình duyệt mà **không phụ thuộc internet hay backend**. Các giải pháp hiện có thường:

- Nặng nề, chứa quảng cáo hoặc yêu cầu đăng nhập tài khoản.
- Giao diện lỗi thời, không tối giản, gây xao nhãng khi làm việc.
- Độ chính xác thời gian không đảm bảo (đồng bộ sai múi giờ, timer drift).
- Không lưu trạng thái khi người dùng tải lại trang.

### 1.2 Mục tiêu sản phẩm

Cung cấp **một ứng dụng web nhẹ, chính xác, đẹp mắt** tích hợp ba công cụ quản lý thời gian thiết yếu trong một giao diện thống nhất, tối giản — chạy hoàn toàn phía client, không cần đăng nhập.

### 1.3 Đối tượng người dùng (Target Users)

| Đối tượng | Nhu cầu chính |
|---|---|
| Lập trình viên / làm việc tập trung | Bấm giờ các task, hẹn giờ Pomodoro |
| Người dùng văn phòng | Xem giờ hiện tại chính xác, hẹn giờ họp |
| Người dùng phổ thông | Đồng hồ bấm giờ cho hoạt động thể thao, nấu ăn |

---

## 2. Core Features — MVP (v1)

> ✅ Chỉ các feature dưới đây được phép triển khai trong v1. Mọi feature khác đều thuộc **Out of Scope**.

---

### 2.1 Đồng hồ số (Digital Clock)

**Mô tả:** Hiển thị thời gian thực lấy từ hệ thống cục bộ của máy người dùng.

**Yêu cầu chức năng:**
- [ ] Hiển thị giờ, phút, giây — cập nhật mỗi giây.
- [ ] Hỗ trợ hai định dạng: **12 giờ (AM/PM)** và **24 giờ**.
- [ ] Hiển thị ngày, tháng, năm và thứ trong tuần.
- [ ] Lưu tuỳ chọn định dạng (12h/24h) vào `localStorage` — tự động khôi phục khi tải lại trang.

**Yêu cầu phi chức năng:**
- Độ trễ hiển thị < 100ms so với đồng hồ hệ thống.
- Không sử dụng API thời gian bên ngoài; chỉ dùng `Date` của JavaScript.

**Ví dụ hiển thị:**
```
Thứ Tư, 15 tháng 1, 2025
  10:45:32 SA
```

---

### 2.2 Hẹn giờ (Countdown Timer)

**Mô tả:** Người dùng đặt khoảng thời gian đếm ngược và nhận thông báo khi hết giờ.

**Yêu cầu chức năng:**
- [ ] Input nhập thời gian theo định dạng **GG:PP:GY** (giờ:phút:giây).
- [ ] Các nút điều khiển: **Bắt đầu / Tạm dừng / Tiếp tục / Đặt lại**.
- [ ] Thanh tiến trình (progress bar) trực quan hiển thị % thời gian còn lại.
- [ ] Phát **âm thanh thông báo** khi đếm ngược về 0.
- [ ] Hiển thị cảnh báo hình ảnh (nhấp nháy / đổi màu) khi còn ≤ 10 giây.
- [ ] Lưu giá trị thời gian đã đặt gần nhất vào `localStorage`.

**Yêu cầu phi chức năng:**
- Sai số đếm ngược < 50ms/phút (dùng `setInterval` kết hợp hiệu chỉnh drift).
- Nếu tab bị ẩn (background), timer vẫn tiếp tục chạy chính xác.

**Ví dụ luồng sử dụng:**
```
Người dùng nhập "00:25:00" → Nhấn "Bắt đầu"
→ Thanh tiến trình đếm ngược
→ Còn 10 giây: viền đỏ nhấp nháy
→ Hết giờ: âm thanh beep + hiển thị banner "Hết giờ!"
→ Nhấn "Đặt lại" → Quay về 00:25:00
```

---

### 2.3 Bấm giờ (Stopwatch)

**Mô tả:** Đo thời gian trôi qua với độ chính xác millisecond và hỗ trợ ghi lại các mốc thời gian (lap).

**Yêu cầu chức năng:**
- [ ] Hiển thị thời gian theo định dạng **GG:PP:GY.ms** (đến millisecond).
- [ ] Các nút điều khiển: **Bắt đầu / Tạm dừng / Tiếp tục / Đặt lại**.
- [ ] Nút **Ghi mốc (Lap)**: lưu thời gian tại mốc hiện tại, hiển thị danh sách các mốc.
- [ ] Danh sách lap hiển thị: số thứ tự, thời gian tại mốc, thời gian chênh lệch giữa các mốc.
- [ ] **Làm nổi bật** lap nhanh nhất (xanh lá) và chậm nhất (đỏ) trong danh sách.
- [ ] Nút **Xoá tất cả lap** khi đặt lại.

**Yêu cầu phi chức năng:**
- Độ chính xác dùng `performance.now()` thay vì `Date.now()` để tránh drift.
- Hiển thị tối đa 100 lap mà không gây lag giao diện.

**Ví dụ hiển thị danh sách lap:**
```
Mốc  | Thời gian mốc | Chênh lệch
-----|---------------|----------
#1   | 00:01:23.456  | +00:01:23.456
#2   | 00:02:45.789  | +00:01:22.333  ← Nhanh nhất 🟢
#3   | 00:04:30.100  | +00:01:44.311  ← Chậm nhất 🔴
```

---

### 2.4 Điều hướng & Giao diện chung (Navigation & Shell)

**Yêu cầu chức năng:**
- [ ] Thanh điều hướng tab để chuyển giữa 3 màn hình: **Đồng hồ / Hẹn giờ / Bấm giờ**.
- [ ] Giao diện hỗ trợ **Dark Mode / Light Mode** — lưu tuỳ chọn vào `localStorage`.
- [ ] Thiết kế **Responsive**: hoạt động tốt trên desktop (≥1024px) và mobile (≥375px).
- [ ] Tiêu đề tab trình duyệt cập nhật động (ví dụ: hiển thị `⏱ 04:59` khi đang đếm ngược).

---

## 3. Out of Scope — Không làm ở v1

> ❌ Các feature dưới đây **bị loại trừ hoàn toàn** khỏi v1. AI không được tự ý thêm các chức năng này vào bất kỳ component nào.

| Hạng mục | Lý do loại trừ |
|---|---|
| **Đồng bộ múi giờ / World Clock** | Tăng độ phức tạp, không thuộc MVP |
| **Tài khoản người dùng / đăng nhập** | Không cần backend, ngoài phạm vi v1 |
| **Đồng bộ dữ liệu lên cloud** | Yêu cầu backend — không có trong kiến trúc |
| **Thông báo Push (Push Notification)** | Cần Service Worker, phức tạp không cần thiết |
| **Đặt nhiều timer đồng thời** | Tăng độ phức tạp UI đáng kể |
| **Import/Export dữ liệu lap** | Tính năng nâng cao, để v2 |
| **Âm thanh tuỳ chỉnh (upload file)** | Ngoài phạm vi v1 |
| **Widget nhúng (embeddable)** | Yêu cầu kiến trúc khác |
| **Lịch sử phiên bấm giờ** | Lưu trữ phức tạp, để v2 |
| **Theme tuỳ chỉnh màu sắc** | Chỉ hỗ trợ Dark/Light cố định ở v1 |
| **Phím tắt bàn phím (Keyboard Shortcuts)** | Tính năng nâng cao, để v2 |
| **Chế độ toàn màn hình (Fullscreen Mode)** | Để v2 |

---

## 4. User Flow Chính

### 4.1 Flow: Xem đồng hồ & đổi định dạng

```
[Mở ứng dụng]
      │
      ▼
[Tab "Đồng hồ" được chọn mặc định]
      │
      ▼
[Hiển thị giờ hiện tại theo định dạng đã lưu (mặc định: 24h)]
      │
      ├─ Người dùng nhấn toggle "12h / 24h"
      │         │
      │         ▼
      │   [Cập nhật hiển thị ngay lập tức]
      │   [Lưu tuỳ chọn vào localStorage]
      │
      └─ Đồng hồ tiếp tục cập nhật mỗi giây
```

---

### 4.2 Flow: Hẹn giờ Pomodoro (25 phút)

```
[Người dùng chuyển sang tab "Hẹn giờ"]
      │
      ▼
[Hiển thị input thời gian — tự điền giá trị lần trước từ localStorage]
      │
      ▼
[Người dùng nhập "00:25:00"] → [Nhấn "Bắt đầu"]
      │
      ▼
[Đếm ngược bắt đầu — thanh tiến trình giảm dần]
[Tiêu đề tab trình duyệt cập nhật: "⏱ 24:59"]
      │
      ├─ Nhấn "Tạm dừng" → [Đếm dừng lại] → Nhấn "Tiếp tục" → [Tiếp tục đếm]
      │
      ├─ Nhấn "Đặt lại" → [Quay về 00:25:00, trạng thái chờ]
      │
      └─ Còn 10 giây → [Viền nhấp nháy đỏ]
               │
               ▼
         [Về 0] → [Phát âm thanh] → [Banner "Hết giờ!"]
               │
               ▼
         [Nhấn "Đặt lại"] → [Quay về 00:25:00]
```

---

### 4.3 Flow: Bấm giờ chạy bộ với Lap

```
[Người dùng chuyển sang tab "Bấm giờ"]
      │
      ▼
[Hiển thị "00:00:00.000" — trạng thái chờ]
      │
      ▼
[Nhấn "Bắt đầu"] → [Đồng hồ chạy — hiển thị đến millisecond]
      │
      ├─ Nhấn "Ghi mốc (Lap)" ×N lần
      │         │
      │         ▼
      │   [Thêm dòng vào danh sách lap]
      │   [Hiển thị thời gian mốc + chênh lệch]
      │   [Cập nhật highlight lap nhanh/chậm nhất]
      │
      ├─ Nhấn "Tạm dừng" → [Đồng hồ dừng, danh sách lap giữ nguyên]
      │         │
      │         └─ Nhấn "Tiếp tục" → [Tiếp tục tính giờ]
      │
      └─ Nhấn "Đặt lại"
               │
               ▼
         [Xác nhận hoặc xoá ngay] → [Về "00:00:00.000", xoá tất cả lap]
```

---

### 4.4 Flow: Đổi chủ đề Dark/Light

```
[Bất kỳ tab nào đang mở]
      │
      ▼
[Người dùng nhấn nút toggle 🌙 / ☀️ trên header]
      │
      ▼
[CSS variables toàn cục được cập nhật ngay lập tức]
[Lưu tuỳ chọn vào localStorage: "theme: dark" | "theme: light"]
      │
      ▼
[Tải lại trang → khôi phục đúng theme đã chọn]
```

---

## 5. Ràng buộc kỹ thuật (Technical Constraints)

| Ràng buộc | Chi tiết |
|---|---|
| **Không backend** | Toàn bộ logic chạy trên client, không gọi API ngoài |
| **Lưu trữ** | Chỉ dùng `localStorage`; không dùng `sessionStorage` hay `IndexedDB` |
| **Thời gian** | Đồng hồ & bấm giờ dùng `performance.now()`; hẹn giờ dùng `setInterval` + drift correction |
| **Framework** | ReactJS + TypeScript; styling bằng Tailwind CSS |
| **Trình duyệt hỗ trợ** | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| **Không phụ thuộc CDN runtime** | Âm thanh thông báo dùng Web Audio API, không load file ngoài |

---

## 6. Tiêu chí hoàn thành MVP (Definition of Done)

- [ ] Ba tab (Đồng hồ, Hẹn giờ, Bấm giờ) đều hoạt động đúng theo spec trên.
- [ ] Dark/Light mode hoạt động và được lưu vào `localStorage`.
- [ ] Toàn bộ tuỳ chọn người dùng được phục hồi sau khi tải lại trang.
- [ ] Giao diện responsive trên viewport 375px (mobile) và 1440px (desktop).
- [ ] Không có lỗi TypeScript (`strict: true`).
- [ ] Không có feature nào thuộc danh sách **Out of Scope** được triển khai.

---

*Tài liệu này là nguồn duy nhất về sự thật (single source of truth) cho scope của v1. Mọi quyết định thêm feature phải được cập nhật vào đây trước khi triển khai.*