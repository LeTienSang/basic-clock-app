/** Định dạng hiển thị giờ */
export type TimeFormat = '12h' | '24h';

/** Cài đặt cho tính năng Đồng hồ */
export interface ClockSettings {
  /** Định dạng 12h hoặc 24h */
  format: TimeFormat;
  /** Có hiển thị giây hay không */
  showSeconds: boolean;
}

/** Trạng thái hiện tại của Đồng hồ */
export interface ClockState {
  /** Đối tượng Date hiện tại */
  now: Date;
  /** Cài đặt hiện tại */
  settings: ClockSettings;
}
