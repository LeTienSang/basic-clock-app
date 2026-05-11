// core/storage.ts — Cấu hình LocalStorage tập trung
// Tiền tố key: "bca_" (basic-clock-app) để tránh xung đột

/** Tiền tố cho tất cả localStorage keys */
export const STORAGE_PREFIX = 'bca_';

/** Danh sách các key được sử dụng trong app */
export const STORAGE_KEYS = {
  /** Tuỳ chọn theme (dark/light) */
  THEME: `${STORAGE_PREFIX}theme`,
  /** Định dạng giờ đã chọn (12h/24h) */
  CLOCK_FORMAT: `${STORAGE_PREFIX}clock_format`,
  /** Giá trị timer đặt gần nhất */
  TIMER_LAST_VALUE: `${STORAGE_PREFIX}timer_last_value`,
  /** Lịch sử các phiên stopwatch */
  STOPWATCH_HISTORY: `${STORAGE_PREFIX}stopwatch_history`,
} as const;

/**
 * Lưu dữ liệu vào LocalStorage
 * @param key - Key để lưu (nên dùng từ STORAGE_KEYS)
 * @param value - Dữ liệu cần lưu (sẽ được stringify sang JSON)
 */
export function setStorageItem<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item ${key} to localStorage:`, error);
  }
}

/**
 * Lấy dữ liệu từ LocalStorage
 * @param key - Key cần lấy
 * @param defaultValue - Giá trị mặc định nếu key không tồn tại
 * @returns Dữ liệu đã được parse từ JSON hoặc defaultValue
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Xoá một item khỏi LocalStorage
 * @param key - Key cần xoá
 */
export function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
  }
}

/**
 * Xoá tất cả dữ liệu có tiền tố của app
 */
export function clearAppStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing app localStorage:', error);
  }
}
