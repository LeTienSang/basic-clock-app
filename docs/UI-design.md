# SKILL: Frontend Design — basic-clock-app

> Áp dụng file này khi thiết kế hoặc chỉnh sửa bất kỳ component UI nào trong dự án.
> Đọc toàn bộ trước khi viết bất kỳ dòng CSS/JSX nào.

---

## 1. Triết lý thiết kế

**Hướng thẩm mỹ:** Tối giản sang trọng — *Luxury Minimal Dark*
- Nền tối sâu, typography sắc nét, animation có chủ đích
- Mỗi pixel phải có lý do tồn tại
- Không dùng border thô — thay bằng shadow + contrast nền
- Breathing room (khoảng trắng) là tính năng, không phải sự lãng phí

**Câu hỏi trước khi thiết kế bất kỳ component nào:**
- Component này giải quyết vấn đề gì cho người dùng?
- Trạng thái nào người dùng sẽ nhìn nhiều nhất? → Tối ưu trạng thái đó
- Nếu bỏ đi element này, UI có mất thông tin không?

---

## 2. Design Tokens

### Màu sắc
```ts
// Nền (dark-mode-first)
--color-bg-base:      #0A0F1E   // Nền tổng thể
--color-bg-surface:   #111827   // Card, panel
--color-bg-elevated:  #1F2937   // Dropdown, tooltip
--color-bg-input:     #1A2235   // Input, select

// Text
--color-text-primary:   #F9FAFB  // Tiêu đề, số lớn
--color-text-secondary: #9CA3AF  // Nhãn, mô tả
--color-text-muted:     #4B5563  // Placeholder, disabled

// Accent — mỗi feature một màu riêng
--color-clock:      #22D3EE  // Cyan — Clock
--color-stopwatch:  #10B981  // Emerald — Stopwatch
--color-timer:      #F59E0B  // Amber — Timer

// Semantic
--color-success:  #10B981
--color-warning:  #F59E0B
--color-danger:   #EF4444
--color-info:     #3B82F6

// Glow (dùng cho số đang chạy)
--glow-clock:      0 0 20px rgba(34,211,238,0.3)
--glow-stopwatch:  0 0 20px rgba(16,185,129,0.3)
--glow-timer:      0 0 20px rgba(245,158,11,0.3)
```

### Typography
```ts
// Font chữ số — PHẢI là monospace để tránh layout shift
--font-display: 'JetBrains Mono', 'Space Mono', monospace
// Font UI
--font-ui:      'Sora', 'DM Sans', sans-serif

// Scale chữ số
--text-timer-xl: clamp(4rem, 15vw, 9rem)   // Số chính
--text-timer-lg: clamp(2rem, 8vw, 5rem)    // Số phụ
--text-timer-ms: clamp(1rem, 3vw, 1.75rem) // Millisecond

// Quan trọng
font-variant-numeric: tabular-nums;  // LUÔN dùng cho số thay đổi
letter-spacing: 0.05em;              // Cho số hiển thị lớn
```

### Spacing
```
4px   → gap nhỏ trong component
8px   → padding nội bộ
16px  → padding component
24px  → gap giữa các element
32px  → padding section
48px  → gap giữa các section
```

### Border Radius
```
4px  → input, tag nhỏ
8px  → button, card nhỏ
16px → card lớn, panel
24px → modal, bottom sheet
9999px → pill, chip, nút tròn
```

---

## 3. Component Patterns

### Nút (Button)
```tsx
// ✅ Đúng — scale feedback + transition
className="
  active:scale-95
  transition-all duration-150
  focus-visible:outline-none focus-visible:ring-2
"

// ✅ Primary — gradient + glow
className="
  bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9]
  hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]
  text-gray-900 font-semibold
"

// ✅ Ghost — chỉ viền khi hover
className="
  border border-transparent
  hover:border-white/20 hover:bg-white/5
"

// ❌ Sai — flat, không feedback
className="bg-blue-500 text-white"
```

### Số hiển thị lớn (Display)
```tsx
// ✅ Đúng
className="
  font-['JetBrains_Mono']
  font-variant-numeric tabular-nums
  text-[clamp(4rem,15vw,9rem)]
  tracking-widest
  text-white
  [text-shadow:var(--glow-clock)]  // khi đang chạy
"

// ✅ Separator nhấp nháy
className="animate-[blink_1s_step-end_infinite] opacity-100"
// keyframes: 50% { opacity: 0 }

// ❌ Sai — font thường, không monospace
className="text-6xl font-bold"
```

### Nút điều khiển tròn (IconButton)
```tsx
// ✅ Nút chính (Start/Stop) — lớn, nổi bật
className="
  w-20 h-20 rounded-full
  bg-gradient-to-br from-emerald-400 to-emerald-600
  hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]
  active:scale-95 transition-all duration-150
"

// ✅ Nút phụ (Lap/Reset) — nhỏ hơn, mờ hơn
className="
  w-14 h-14 rounded-full
  bg-white/10 hover:bg-white/20
  border border-white/10
  active:scale-95 transition-all duration-150
"
```

---

## 4. Animation Guidelines

### Nguyên tắc
- Duration: 100-150ms (feedback), 200-300ms (transition), 400-600ms (reveal)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` cho hầu hết, `spring` cho interactive
- **KHÔNG** animate những gì cập nhật mỗi frame (số đang chạy) — dùng CSS `tabular-nums` thay thế
- **CÓ** animate state changes (start→stop, idle→running)

### Các animation cụ thể
```css
/* Tab switch */
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Blink separator */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* Pulse khi timer hết */
@keyframes timerPulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.02); }
}

/* Ripple cho button click */
@keyframes ripple {
  from { transform: scale(0); opacity: 0.6; }
  to   { transform: scale(2.5); opacity: 0; }
}
```

---

## 5. Layout & Responsive

### App Shell
```
Mobile (< 640px):
- Tab bar: cố định dưới cùng, height 64px
- Content: full width, padding 16px, padding-bottom 80px
- Số hiển thị: clamp scale tự động

Desktop (≥ 640px):
- Max-width: 480px, căn giữa màn hình
- Tab bar: trên cùng hoặc dưới tùy preference
- Có thể thêm backdrop-blur nền
```

### Safe Area (Mobile)
```css
padding-bottom: max(16px, env(safe-area-inset-bottom));
padding-left:   max(16px, env(safe-area-inset-left));
padding-right:  max(16px, env(safe-area-inset-right));
```

### Touch Targets
```
Tối thiểu: 44×44px cho mọi element tương tác
Nút chính (Start/Stop): 72-80px
Nút phụ: 56px
Tab bar item: full height × 1/3 width
```

---

## 6. Checklist trước khi commit UI

### Visual
- [ ] Font monospace đã áp dụng cho tất cả số thay đổi theo thời gian
- [ ] `tabular-nums` đã được set, không có layout shift khi số thay đổi
- [ ] Màu accent đúng theo feature (cyan/emerald/amber)
- [ ] Dark mode không có element nào dùng màu trắng thuần (#fff) làm nền
- [ ] Không có border `border-gray-*` thô — thay bằng `border-white/10`

### Interaction
- [ ] Tất cả button có `active:scale-95` hoặc feedback tương tự
- [ ] Hover state rõ ràng, không dùng `cursor: default` cho element tương tác
- [ ] Focus state visible cho keyboard navigation (`focus-visible:ring-2`)
- [ ] Touch target ≥ 44px

### Performance
- [ ] Chỉ animate `transform` và `opacity` — không animate `width/height/top/left`
- [ ] Số chạy real-time KHÔNG có CSS transition (gây lag)
- [ ] Dùng `will-change: transform` cho element animate thường xuyên

### Accessibility
- [ ] Contrast ratio text/background ≥ 4.5:1 (WCAG AA)
- [ ] Tất cả IconButton có `aria-label`
- [ ] Timer alert có `aria-live="assertive"`

---

## 7. Những gì KHÔNG được làm

```
❌ Dùng Inter, Roboto, Arial, system-ui cho số hiển thị
❌ Purple gradient trên nền trắng
❌ Flat design không có depth (shadow/contrast)
❌ Border-radius đồng đều tất cả (4px cho mọi thứ)
❌ Animation trên thuộc tính không phải transform/opacity
❌ Thêm decoration không có chức năng (divider line thừa, icon thừa)
❌ Màu text #ffffff trên nền tối (dùng #F9FAFB hoặc white/90)
❌ Padding < 16px cho mobile
```

---

## 8. Tham chiếu nhanh khi làm từng feature

| Feature | Accent color | Glow | Font size chính | Đặc điểm UI |
|---------|-------------|------|-----------------|-------------|
| Clock | `#22D3EE` cyan | `rgba(34,211,238,0.3)` | `clamp(5rem,18vw,10rem)` | Separator nhấp nháy, ngày tháng mờ bên dưới |
| Stopwatch | `#10B981` emerald | `rgba(16,185,129,0.3)` | `clamp(4rem,15vw,8rem)` | ms nhỏ hơn + màu accent, lap list scroll |
| Timer | `#F59E0B` amber | `rgba(245,158,11,0.3)` | `clamp(4rem,15vw,8rem)` | SVG progress circle, đổi màu đỏ khi gần hết |