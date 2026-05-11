/**
 * Kiểm tra xem một chuỗi có phải là số nguyên dương hay không
 * @param value - Chuỗi cần kiểm tra
 * @returns boolean
 * @example isPositiveInteger("123") // true
 * @example isPositiveInteger("-5") // false
 */
export function isPositiveInteger(value: string): boolean {
  const num = Number(value);
  return Number.isInteger(num) && num >= 0;
}

/**
 * Validate input cho Timer (giờ, phút, giây)
 * @param hours - Số giờ
 * @param minutes - Số phút
 * @param seconds - Số giây
 * @returns true nếu tất cả hợp lệ và tổng thời gian > 0
 * @example validateTimerInput(0, 25, 0) // true
 * @example validateTimerInput(0, 0, 0) // false
 */
export function validateTimerInput(hours: number, minutes: number, seconds: number): boolean {
  if (hours < 0 || minutes < 0 || seconds < 0) return false;
  if (minutes >= 60 || seconds >= 60) return false;
  
  const totalMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
  return totalMs > 0;
}

/**
 * Giới hạn một số trong khoảng min và max
 * @param num - Số cần kiểm tra
 * @param min - Giá trị nhỏ nhất
 * @param max - Giá trị lớn nhất
 * @returns Số đã được giới hạn
 * @example clamp(75, 0, 60) // 60
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}
