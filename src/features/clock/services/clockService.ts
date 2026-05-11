/**
 * Lấy thời gian hệ thống hiện tại
 * @returns Đối tượng Date mới nhất
 */
export function getCurrentTime(): Date {
  return new Date();
}

/**
 * Kiểm tra xem có đang ở chế độ tối không (tuỳ chọn thêm cho service nếu cần)
 * Lưu ý: Logic theme chính nằm ở core/theme.ts
 */
export function isNightTime(date: Date): boolean {
  const hours = date.getHours();
  return hours >= 18 || hours <= 6;
}
