# PROJECT-RULES.md

> **Mục đích:** Bộ luật bắt buộc dành cho AI assistant và lập trình viên — ngăn chặn các lỗi pattern lặp lại, đảm bảo tính nhất quán và khả năng bảo trì của codebase.
>
> **Dự án:** `basic-clock-app`
> **Phiên bản:** 1.0.0
> **Cập nhật lần cuối:** 2025-07-14
> **Tác giả:** Sang

---

## MỤC LỤC

1. [Quy tắc Bảo mật (Security Rules)](#1-quy-tắc-bảo-mật-security-rules)
2. [Quy tắc TypeScript (TypeScript Rules)](#2-quy-tắc-typescript-typescript-rules)
3. [Quy tắc React Component (React Component Rules)](#3-quy-tắc-react-component-react-component-rules)
4. [Quy tắc Tạo File Mới (File Creation Rules)](#4-quy-tắc-tạo-file-mới-file-creation-rules)
5. [Quy tắc LocalStorage (LocalStorage Rules)](#5-quy-tắc-localstorage-localstorage-rules)
6. [Quy tắc Logic Thời Gian (Time Logic Rules)](#6-quy-tắc-logic-thời-gian-time-logic-rules)
7. [Quy tắc Đặt Tên (Naming Rules)](#7-quy-tắc-đặt-tên-naming-rules)
8. [Quy tắc Style & CSS (Style Rules)](#8-quy-tắc-style--css-style-rules)
9. [Quy tắc Không Được Vi Phạm (Hard Rules — Never Break)](#9-quy-tắc-không-được-vi-phạm-hard-rules--never-break)

---

## 1. Quy tắc Bảo mật (Security Rules)

### ❌ CẤMLỆNH TUYỆT ĐỐI

```typescript
// ❌ SAI — NGHIÊM CẤM: innerHTML tạo ra lỗ hổng XSS
element.innerHTML = userInput;
divRef.current.innerHTML = `<span>${timeString}</span>`;

// ❌ SAI — NGHIÊM CẤM: eval() thực thi mã tùy ý
eval(expression);
new Function("return " + code)();
setTimeout("doSomething()", 1000); // chuỗi trong setTimeout = eval ẩn

// ❌ SAI — NGHIÊM CẤM: dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: content }} />
```

### ✅ CÁCH ĐÚNG

```typescript
// ✅ ĐÚNG — Dùng textContent hoặc React state
element.textContent = timeString;

// ✅ ĐÚNG — Dùng JSX thuần
<span className="time-display">{timeString}</span>

// ✅ ĐÚNG — setTimeout chỉ nhận callback function
setTimeout(() => doSomething(), 1000);
```

**Lý do:** Dù `basic-clock-app` không nhận input người dùng phức tạp, việc cấm `innerHTML`/`eval()` là nguyên tắc nền tảng — ngăn lỗi khi mở rộng tính năng sau này.

---

## 2. Quy tắc TypeScript (TypeScript Rules)

### ❌ NGHIÊM CẤM dùng `any`

```typescript
// ❌ SAI — mất hết lợi ích TypeScript
const handleTimer = (data: any) => { ... };
let lapTime: any = 0;
const storageData: any = JSON.parse(raw);
```

### ✅ PHẢI dùng kiểu cụ thể hoặc `unknown`

```typescript
// ✅ ĐÚNG — Định nghĩa interface rõ ràng
interface LapRecord {
  id: string;
  lapNumber: number;
  lapTime: number;      // milliseconds
  totalTime: number;    // milliseconds
  timestamp: number;    // Unix timestamp
}

// ✅ ĐÚNG — Dùng unknown + type guard khi parse dữ liệu ngoài
const raw = localStorage.getItem("lap-records");
const parsed: unknown = JSON.parse(raw ?? "[]");
if (isLapRecordArray(parsed)) {
  setLapRecords(parsed); // an toàn
}

// ✅ ĐÚNG — Union type thay vì any
type ClockMode = "clock" | "timer" | "stopwatch";
```

### Quy tắc cụ thể

- **Tất cả props đều phải có interface/type** — không để TypeScript tự suy luận props của component.
- **Không dùng `as any`** để ép kiểu — dùng `as SpecificType` kèm comment giải thích.
- **Bật strict mode** trong `tsconfig.json` (`"strict": true`).

---

## 3. Quy tắc React Component (React Component Rules)

### ❌ KHÔNG dùng Class Component

```typescript
// ❌ SAI — Không dùng class component trong dự án này
class StopwatchDisplay extends React.Component<Props, State> {
  render() { ... }
}
```

### ✅ CHỈ dùng Functional Component + Hooks

```typescript
// ✅ ĐÚNG — Functional component với hooks
const StopwatchDisplay: React.FC<StopwatchDisplayProps> = ({ elapsed, isRunning }) => {
  const formattedTime = useFormattedTime(elapsed);

  return (
    <div className="stopwatch-display">
      <span className="time">{formattedTime}</span>
    </div>
  );
};

export default StopwatchDisplay;
```

### Quy tắc cụ thể

| Tình huống | Bắt buộc |
|---|---|
| Component có logic tái sử dụng | Tách thành custom hook (`use*.ts`) |
| Component > 150 dòng | Phải tách thành sub-component |
| Side effects (timer, interval) | Dùng `useEffect` + cleanup return |
| State phức tạp (nhiều fields liên quan) | Dùng `useReducer` thay `useState` |
| Chia sẻ state giữa nhiều tầng | Dùng Context API |

### Ví dụ: Interval cleanup đúng cách

```typescript
// ✅ ĐÚNG — luôn cleanup interval để tránh memory leak
useEffect(() => {
  if (!isRunning) return;

  const intervalId = setInterval(() => {
    setElapsed(prev => prev + 10);
  }, 10);

  return () => clearInterval(intervalId); // ← KHÔNG ĐƯỢC BỎ
}, [isRunning]);
```

---

## 4. Quy tắc Tạo File Mới (File Creation Rules)

> ⚠️ **Mọi file mới PHẢI được đặt đúng thư mục theo `ARCHITECTURE.md`.** Vi phạm quy tắc này sẽ làm hỏng cấu trúc dự án và gây khó khăn cho việc bảo trì.

### Cấu trúc thư mục bắt buộc

```
src/
├── components/          # UI Component thuần (không có business logic)
│   ├── clock/           # Các component của tính năng Đồng hồ
│   ├── timer/           # Các component của tính năng Hẹn giờ
│   ├── stopwatch/       # Các component của tính năng Bấm giờ
│   └── common/          # Component dùng chung (Button, Display, v.v.)
│
├── hooks/               # Custom React hooks (tất cả file bắt đầu bằng "use")
│   ├── useClock.ts
│   ├── useTimer.ts
│   └── useStopwatch.ts
│
├── utils/               # Hàm tiện ích thuần (pure functions, không có React)
│   ├── timeFormatter.ts # Định dạng thời gian hiển thị
│   └── storageHelper.ts # Wrapper cho LocalStorage
│
├── types/               # TypeScript interfaces & types toàn cục
│   └── index.ts
│
├── constants/           # Hằng số (không được hardcode trong component)
│   └── index.ts
│
└── context/             # React Context (nếu cần state toàn cục)
    └── AppContext.tsx
```

### Quyết định đặt file — Bảng tra cứu nhanh

| Loại file | Đặt tại | Ví dụ tên file |
|---|---|---|
| UI component cho 1 tính năng | `components/<feature>/` | `TimerDisplay.tsx` |
| UI component dùng chung | `components/common/` | `DigitBlock.tsx` |
| Logic có dùng React hooks | `hooks/` | `useStopwatch.ts` |
| Hàm xử lý không dùng React | `utils/` | `timeFormatter.ts` |
| Kiểu dữ liệu / Interface | `types/` | `index.ts` |
| Giá trị cố định (magic number) | `constants/` | `index.ts` |

### Quy tắc đặt tên file

```
components/   → PascalCase.tsx       (TimerControls.tsx)
hooks/        → camelCase.ts         (useStopwatch.ts) — bắt đầu bằng "use"
utils/        → camelCase.ts         (timeFormatter.ts)
types/        → camelCase.ts         (index.ts)
constants/    → camelCase.ts         (index.ts)
```

---

## 5. Quy tắc LocalStorage (LocalStorage Rules)

### ❌ NGHIÊM CẤM truy cập LocalStorage trực tiếp trong component

```typescript
// ❌ SAI — truy cập thẳng từ component
const MyComponent = () => {
  const data = JSON.parse(localStorage.getItem("timer-settings") || "{}");
  localStorage.setItem("lap-records", JSON.stringify(laps));
};
```

### ✅ PHẢI thông qua `utils/storageHelper.ts`

```typescript
// ✅ utils/storageHelper.ts — wrapper tập trung
const STORAGE_KEYS = {
  TIMER_SETTINGS: "basic-clock:timer-settings",
  LAP_RECORDS: "basic-clock:lap-records",
} as const;

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback; // tránh crash khi data bị corrupt
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`[Storage] Không thể lưu key "${key}":`, e);
    }
  },
};

// ✅ Dùng trong component thông qua hook
const { lapRecords, saveLapRecord } = useLapStorage();
```

### Quy tắc về storage key

- Tất cả key phải có prefix `basic-clock:` để tránh xung đột.
- Khai báo tập trung trong `constants/index.ts` hoặc `utils/storageHelper.ts` — không được viết chuỗi key trực tiếp.

---

## 6. Quy tắc Logic Thời Gian (Time Logic Rules)

### Đơn vị thời gian nội bộ

- **Toàn bộ logic tính toán thời gian dùng milliseconds (ms)** làm đơn vị chuẩn.
- Chỉ chuyển đổi sang phút/giây/giờ tại lớp **hiển thị** (`utils/timeFormatter.ts`).

```typescript
// ✅ ĐÚNG — lưu trữ và tính toán bằng ms
interface StopwatchState {
  elapsed: number;    // ms — KHÔNG phải giây
  lapTimes: number[]; // ms — KHÔNG phải giây
}

// ✅ ĐÚNG — chỉ format khi hiển thị
const display = formatTime(elapsed); // "01:23:45.678"
```

### Nguồn thời gian

- Đồng hồ số: dùng `Date` object — đồng bộ với đồng hồ hệ thống.
- Bấm giờ / Hẹn giờ: dùng `performance.now()` hoặc `Date.now()` kết hợp với `startTimestamp` — **không cộng dồn trong `setInterval`** (gây drift).

```typescript
// ❌ SAI — drift theo thời gian do interval không chính xác
setInterval(() => setElapsed(prev => prev + 10), 10);

// ✅ ĐÚNG — tính dựa trên thời điểm bắt đầu thực tế
const startRef = useRef<number>(0);
setInterval(() => {
  setElapsed(Date.now() - startRef.current);
}, 10);
```

---

## 7. Quy tắc Đặt Tên (Naming Rules)

### Quy ước chung

| Loại | Convention | Ví dụ |
|---|---|---|
| Component | PascalCase | `TimerDisplay`, `LapTable` |
| Hook | camelCase, prefix `use` | `useStopwatch`, `useFormattedTime` |
| Hàm utility | camelCase | `formatMilliseconds`, `parseLapRecord` |
| Hằng số | SCREAMING_SNAKE_CASE | `MAX_LAPS`, `DEFAULT_TIMER_SECONDS` |
| Type / Interface | PascalCase | `LapRecord`, `TimerState` |
| CSS class (Tailwind) | kebab-case (nếu custom) | `time-display`, `lap-item` |
| Biến boolean | prefix `is`, `has`, `can` | `isRunning`, `hasLaps`, `canReset` |
| Handler function | prefix `handle` | `handleStart`, `handleLapClick` |
| Callback prop | prefix `on` | `onStart`, `onLapAdd`, `onReset` |

### Ví dụ đặt tên prop

```typescript
// ✅ ĐÚNG
interface TimerControlsProps {
  isRunning: boolean;        // state boolean
  canReset: boolean;         // derived boolean
  onStart: () => void;       // callback prop
  onPause: () => void;
  onReset: () => void;
}
```

---

## 8. Quy tắc Style & CSS (Style Rules)

### Tailwind CSS

- **Dùng Tailwind utility classes** là ưu tiên số 1.
- **KHÔNG được viết CSS inline** cho layout/spacing/color — chỉ dùng Tailwind.
- **KHÔNG được hardcode màu hex** trong JSX — khai báo trong `tailwind.config.js`.

```typescript
// ❌ SAI — style inline
<div style={{ color: "#00ff88", fontSize: "4rem" }}>

// ✅ ĐÚNG — Tailwind class
<div className="text-primary text-6xl font-mono tabular-nums">
```

### Quy tắc font số

- Toàn bộ hiển thị số thời gian PHẢI dùng `font-mono` và `tabular-nums` để ngăn layout shift.

```typescript
// ✅ ĐÚNG — font cố định chiều rộng cho số
<span className="font-mono tabular-nums text-4xl">{timeDisplay}</span>
```

---

## 9. Quy tắc Không Được Vi Phạm (Hard Rules — Never Break)

Danh sách các lệnh cấm tuyệt đối — **không có ngoại lệ**, kể cả khi có lý do "tạm thời":

| # | Cấm | Thay thế bắt buộc |
|---|---|---|
| 1 | `innerHTML =` | JSX / `textContent` |
| 2 | `dangerouslySetInnerHTML` | JSX thuần |
| 3 | `eval()` / `new Function(str)` | Logic function thực sự |
| 4 | `setTimeout(string, ...)` | `setTimeout(() => fn(), ...)` |
| 5 | `type: any` | Interface cụ thể / `unknown` |
| 6 | `as any` không có comment | `as SpecificType // lý do` |
| 7 | Class Component | Functional Component |
| 8 | `localStorage.getItem/setItem` trực tiếp trong component | `utils/storageHelper.ts` |
| 9 | Magic number hardcode trong JSX | `constants/index.ts` |
| 10 | File đặt sai thư mục | Đúng folder theo ARCHITECTURE.md |

---

> 💡 **Ghi chú cho AI assistant:** Trước khi sinh code mới, đối chiếu checklist trong **Mục 9** và cấu trúc folder trong **Mục 4**. Nếu có xung đột giữa yêu cầu của người dùng và các quy tắc trên, **ưu tiên quy tắc và thông báo cho người dùng**.