/** Trạng thái của Timer */
export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

/** Mẫu thời gian có sẵn (preset) */
export interface TimerPreset {
  id: string;
  label: string;
  /** Thời gian tính bằng giây */
  duration: number;
}

/** Trạng thái toàn cục của tính năng Hẹn giờ */
export interface TimerState {
  /** Tổng thời gian đã đặt ban đầu (ms) */
  totalDuration: number;
  /** Thời gian còn lại (ms) */
  remainingTime: number;
  /** Trạng thái hiện tại */
  status: TimerStatus;
}
