# ARCHITECTURE.md — basic-clock-app

> **Mục đích tài liệu này:** Cung cấp bức tranh kỹ thuật tổng thể để mọi thành viên (người và AI) hiểu đúng kiến trúc trước khi chạm vào code. **Không mô tả chi tiết tính năng.**

---

## 1. Tổng quan kiến trúc

```
Kiểu kiến trúc : Monolithic — Component-based (Client-only)
Không có server  : Toàn bộ logic chạy trên trình duyệt
Trạng thái      : Quản lý cục bộ bằng React State + LocalStorage
```

Ứng dụng được xây dựng theo mô hình **Component-based SPA** (Single Page Application). Không có backend, không có API call ra ngoài. Mọi dữ liệu đều sống trong bộ nhớ trình duyệt hoặc `localStorage`.

---

## 2. Tech Stack

| Tầng | Công nghệ | Ghi chú |
|---|---|---|
| UI Framework | ReactJS 18+ | Functional components + Hooks |
| Ngôn ngữ | TypeScript | Strict mode khuyến nghị |
| Styling | Tailwind CSS | Utility-first, không dùng CSS module |
| Build Tool | Vite | Dev server nhanh, HMR tốt |
| Lưu trữ | LocalStorage (Web API) | Không có thư viện ngoài |
| Runtime | Browser (Client-only) | Không có Node.js runtime ở production |

---

## 3. Component Map

```
App (Root)
│
├── Layout
│   ├── Header              ← Điều hướng giữa các tính năng
│   └── Footer (tuỳ chọn)
│
├── Feature A               ← Tính năng độc lập #1
│   ├── FeatureAContainer   ← Quản lý state, logic nghiệp vụ
│   ├── FeatureADisplay     ← Hiển thị dữ liệu (presentational)
│   └── FeatureAControls    ← Các nút điều khiển
│
├── Feature B               ← Tính năng độc lập #2
│   ├── FeatureBContainer
│   ├── FeatureBDisplay
│   └── FeatureBControls
│
├── Feature C               ← Tính năng độc lập #3
│   ├── FeatureCContainer
│   ├── FeatureCDisplay
│   └── FeatureCControls
│
└── shared/                 ← Dùng chung toàn app
    ├── components/         ← UI primitives (Button, Modal, ...)
    ├── hooks/              ← Custom hooks tái sử dụng
    └── utils/              ← Hàm tiện ích thuần (pure functions)
```

**Nguyên tắc phân tầng component:**
- `*Container`: chứa logic, gọi hooks, quản lý state — không tự render UI phức tạp.
- `*Display`: nhận props, render thuần — không có side effect.
- `*Controls`: xử lý sự kiện người dùng, gọi callback từ Container.

---

## 4. Data Flow

Ứng dụng không có server nên không có luồng request/response. Toàn bộ dữ liệu đi theo chiều dọc (top-down props) hoặc ngang qua shared state/hooks.

```
[Người dùng tương tác]
        │
        ▼
[Controls Component]  ──── gọi callback ────▶  [Container Component]
                                                        │
                                          ┌─────────────┼──────────────┐
                                          ▼             ▼              ▼
                                   [React State]  [Custom Hook]  [LocalStorage]
                                          │             │
                                          └──── re-render ────▶ [Display Component]
```

**Chi tiết luồng dữ liệu:**

1. **Tương tác → State:** Người dùng nhấn nút → `Controls` gọi callback → `Container` cập nhật `useState` / `useReducer`.
2. **State → UI:** React re-render tự động → `Display` nhận props mới → vẽ lại giao diện.
3. **State → LocalStorage:** Các hook chuyên biệt (`useLocalStorage`, `usePersist`) lắng nghe state thay đổi và đồng bộ xuống storage.
4. **LocalStorage → State (khởi động):** Khi app mount, các hook đọc giá trị từ storage làm `initialState`.

---

## 5. Cấu trúc thư mục

```
basic-clock-app/
│
├── public/                     # Tài nguyên tĩnh (favicon, manifest)
│
├── src/
│   ├── main.tsx                # Điểm khởi động — mount React vào DOM
│   ├── App.tsx                 # Root component — định tuyến giữa các tính năng
│   │
│   ├── features/               # Mỗi thư mục con = 1 tính năng độc lập
│   │   ├── feature-a/
│   │   │   ├── index.ts        # Public API của feature (re-export)
│   │   │   ├── FeatureAContainer.tsx
│   │   │   ├── FeatureADisplay.tsx
│   │   │   ├── FeatureAControls.tsx
│   │   │   ├── useFeatureA.ts  # Hook nghiệp vụ riêng của feature
│   │   │   └── featureA.types.ts
│   │   │
│   │   ├── feature-b/          # Cấu trúc tương tự feature-a
│   │   └── feature-c/          # Cấu trúc tương tự feature-a
│   │
│   ├── shared/
│   │   ├── components/         # UI dùng chung (Button, IconWrapper, ...)
│   │   ├── hooks/              # Custom hooks dùng chung (useLocalStorage, useInterval, ...)
│   │   ├── utils/              # Pure functions (formatTime, padZero, ...)
│   │   └── types/              # TypeScript types/interfaces toàn cục
│   │
│   └── styles/
│       └── index.css           # Tailwind directives + global overrides
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── package.json
```

**Quy tắc import:**
- Feature chỉ import từ `shared/` — không bao giờ import chéo giữa các feature.
- `shared/` không được import từ `features/`.
- Mỗi feature expose API ra ngoài thông qua file `index.ts`.

---

## 6. Storage Strategy

| Thuộc tính | Quyết định | Lý do |
|---|---|---|
| Loại storage | `localStorage` | Dữ liệu bền vững, không cần sync đa tab |
| Scope | Per-origin (domain) | Phù hợp ứng dụng đơn người dùng |
| Thư viện | Không — dùng Web API thuần | Tránh dependency không cần thiết |

**Những gì được lưu vào LocalStorage:**

```
localStorage keys (tiền tố: "bca_")
│
├── bca_feature_b_state     ← Trạng thái cuối cùng của Feature B (nếu cần phục hồi)
├── bca_feature_c_history   ← Lịch sử các phiên của Feature C (mảng JSON)
└── bca_user_preferences    ← Tuỳ chỉnh giao diện (theme, format hiển thị)
```

**Những gì KHÔNG lưu vào LocalStorage:**
- Trạng thái UI nhất thời (modal đang mở, tab đang chọn) — dùng React state.
- Giá trị đang đếm thời gian thực — tính toán lại khi mount.

**Quy ước key:**
- Dùng tiền tố `bca_` để tránh xung đột với các app khác trên cùng origin.
- Giá trị luôn là chuỗi JSON — parse/stringify tập trung trong hook `useLocalStorage`.

---

## 7. Các ràng buộc kiến trúc (Architectural Constraints)

Những quyết định này **không được thay đổi** khi thêm tính năng mới:

1. **Không có backend call:** Không fetch API ngoài, không WebSocket — logic xử lý nằm 100% ở client.
2. **Không dùng global state manager** (Redux, Zustand, ...): Scope nhỏ, state được quản lý trong từng feature qua hooks.
3. **Thời gian lấy từ hệ thống local:** Không đồng bộ NTP hay server time — đây là quyết định thiết kế có chủ ý.
4. **Mỗi feature là một module độc lập:** Thêm Feature D không được làm ảnh hưởng Feature A, B, C.
5. **TypeScript bắt buộc:** Mọi file `.tsx`/`.ts` phải có type rõ ràng — không dùng `any`.

---

## 8. Hướng dẫn cho AI Assistant

Khi hỗ trợ dự án này, AI cần tuân theo các nguyên tắc sau:

- **Tạo file mới** → đặt đúng vào `features/feature-x/` hoặc `shared/`.
- **Thêm logic** → ưu tiên tạo custom hook, không nhét thẳng vào component.
- **Thêm tính năng mới** → tạo thư mục riêng trong `features/`, không sửa feature hiện có.
- **Lưu dữ liệu** → dùng hook `useLocalStorage`, không gọi `localStorage` trực tiếp trong component.
- **Không tự ý thêm thư viện ngoài** → hỏi người dùng trước khi thêm dependency mới vào `package.json`.