// core/constants.ts — Hằng số toàn cục

/** Tên ứng dụng */
export const APP_NAME = 'Basic Clock App';

/** Các định dạng thời gian hỗ trợ */
export const TIME_FORMATS = {
  H12: '12h',
  H24: '24h',
} as const;

/** Các trạng thái của Timer */
export const TIMER_STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  FINISHED: 'finished',
} as const;

/** Các trạng thái của Stopwatch */
export const STOPWATCH_STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
} as const;

/** Interval cập nhật đồng hồ (ms) */
export const CLOCK_UPDATE_INTERVAL = 1000;

/** Interval cập nhật stopwatch (ms) — cần nhanh hơn vì hiển thị millisecond */
export const STOPWATCH_UPDATE_INTERVAL = 10;

/** Interval cập nhật timer (ms) */
export const TIMER_UPDATE_INTERVAL = 100;

/** Số giây cảnh báo khi timer sắp hết */
export const TIMER_WARNING_THRESHOLD = 10;

/** Số lap tối đa cho stopwatch */
export const MAX_LAPS = 100;

/** Tab mặc định khi mở app */
export const DEFAULT_TAB = 'clock' as const;

/** Milliseconds trong các đơn vị thời gian */
export const MS_IN_SECOND = 1000;
export const MS_IN_MINUTE = 60 * MS_IN_SECOND;
export const MS_IN_HOUR = 60 * MS_IN_MINUTE;
export const MS_IN_DAY = 24 * MS_IN_HOUR;
