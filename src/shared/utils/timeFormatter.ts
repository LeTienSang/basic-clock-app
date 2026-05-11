import { MS_IN_HOUR, MS_IN_MINUTE, MS_IN_SECOND } from '../../core/constants';

/**
 * Đệm số 0 phía trước nếu số nhỏ hơn 10 (hoặc độ dài mong muốn)
 * @param num - Số cần đệm
 * @param length - Độ dài chuỗi mong muốn (mặc định là 2)
 * @returns Chuỗi đã được đệm số 0
 * @example padZero(5) // "05"
 * @example padZero(12, 3) // "012"
 */
export function padZero(num: number, length: number = 2): string {
  return num.toString().padStart(length, '0');
}

/**
 * Chuyển đổi milliseconds sang các thành phần thời gian (h, m, s, ms)
 * @param ms - Tổng số milliseconds
 * @returns Đối tượng chứa hours, minutes, seconds, milliseconds
 * @example getTimeComponents(3661000) // { hours: 1, minutes: 1, seconds: 1, ms: 0 }
 */
export function getTimeComponents(ms: number) {
  const hours = Math.floor(ms / MS_IN_HOUR);
  const minutes = Math.floor((ms % MS_IN_HOUR) / MS_IN_MINUTE);
  const seconds = Math.floor((ms % MS_IN_MINUTE) / MS_IN_SECOND);
  const milliseconds = ms % MS_IN_SECOND;

  return { hours, minutes, seconds, milliseconds };
}

/**
 * Định dạng milliseconds sang chuỗi HH:MM:SS
 * @param ms - Tổng số milliseconds
 * @param showHours - Có luôn hiển thị giờ hay không (mặc định true)
 * @returns Chuỗi định dạng HH:MM:SS
 * @example formatToHHMMSS(3661000) // "01:01:01"
 */
export function formatToHHMMSS(ms: number, showHours: boolean = true): string {
  const { hours, minutes, seconds } = getTimeComponents(ms);
  
  const h = padZero(hours);
  const m = padZero(minutes);
  const s = padZero(seconds);

  return showHours ? `${h}:${m}:${s}` : `${m}:${s}`;
}

/**
 * Định dạng milliseconds sang chuỗi MM:SS.ms (thường dùng cho Stopwatch)
 * @param ms - Tổng số milliseconds
 * @returns Chuỗi định dạng MM:SS.ms (ms lấy 3 chữ số)
 * @example formatToMMSSMs(61005) // "01:01.005"
 */
export function formatToMMSSMs(ms: number): string {
  const { minutes, seconds, milliseconds } = getTimeComponents(ms);
  
  const m = padZero(minutes);
  const s = padZero(seconds);
  const mss = padZero(milliseconds, 3);

  return `${m}:${s}.${mss}`;
}
