/**
 * Lấy tên thứ trong tuần bằng tiếng Việt
 * @param date - Đối tượng Date
 * @returns Tên thứ (ví dụ: "Thứ Hai", "Chủ Nhật")
 * @example getVietnameseDayOfWeek(new Date()) // "Thứ Hai"
 */
export function getVietnameseDayOfWeek(date: Date): string {
  const days = [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ];
  return days[date.getDay()];
}

/**
 * Định dạng ngày tháng sang chuỗi tiếng Việt đầy đủ
 * @param date - Đối tượng Date
 * @returns Chuỗi định dạng "Thứ X, ngày DD tháng MM năm YYYY"
 * @example formatVietnameseFullDate(new Date(2025, 0, 15)) // "Thứ Tư, 15 tháng 1, 2025"
 */
export function formatVietnameseFullDate(date: Date): string {
  const dayName = getVietnameseDayOfWeek(date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${dayName}, ${day} tháng ${month}, ${year}`;
}

/**
 * Định dạng giờ phút giây kèm AM/PM nếu cần
 * @param date - Đối tượng Date
 * @param is12h - Sử dụng định dạng 12 giờ hay không (mặc định false)
 * @returns Chuỗi định dạng "HH:MM:SS" hoặc "HH:MM:SS AM/PM"
 * @example formatTimeDisplay(new Date(), true) // "10:45:32 SA"
 */
export function formatTimeDisplay(date: Date, is12h: boolean = false): string {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  if (!is12h) {
    return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
  }

  const period = hours >= 12 ? 'CH' : 'SA';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 thành 12
  
  return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${period}`;
}
