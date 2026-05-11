/** Trạng thái của Stopwatch */
export type StopwatchStatus = 'idle' | 'running' | 'paused';

/** Bản ghi một vòng (lap) */
export interface LapRecord {
  /** Số thứ tự vòng (1-indexed) */
  id: number;
  /** Tổng thời gian tại thời điểm ghi mốc (ms) */
  totalTime: number;
  /** Thời gian của riêng vòng này (ms) */
  lapTime: number;
  /** Loại lap (để highlight) */
  type?: 'fastest' | 'slowest' | 'normal';
}

/** Trạng thái toàn cục của tính năng Bấm giờ */
export interface StopwatchState {
  /** Thời gian đã trôi qua (ms) */
  elapsedTime: number;
  /** Trạng thái hiện tại */
  status: StopwatchStatus;
  /** Danh sách các vòng đã ghi */
  laps: LapRecord[];
}
