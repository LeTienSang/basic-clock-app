import { STORAGE_KEYS, getStorageItem, setStorageItem } from '../../../core';
import type { TimerPreset } from '../types';

/** Các preset mặc định */
const DEFAULT_PRESETS: TimerPreset[] = [
  { id: 'p1', label: '5 Phút', duration: 300 },
  { id: 'p2', label: '10 Phút', duration: 600 },
  { id: 'p3', label: '25 Phút', duration: 1500 },
  { id: 'p4', label: '1 Giờ', duration: 3600 },
];

/**
 * Lấy danh sách presets từ localStorage hoặc dùng mặc định
 */
export function getTimerPresets(): TimerPreset[] {
  return getStorageItem<TimerPreset[]>(STORAGE_KEYS.TIMER_LAST_VALUE + '_presets', DEFAULT_PRESETS);
}

/**
 * Lưu giá trị timer cuối cùng được chọn
 * @param duration - Thời gian tính bằng ms
 */
export function saveLastTimerValue(duration: number): void {
  setStorageItem(STORAGE_KEYS.TIMER_LAST_VALUE, duration);
}

/**
 * Lấy giá trị timer cuối cùng
 */
export function getLastTimerValue(): number {
  return getStorageItem<number>(STORAGE_KEYS.TIMER_LAST_VALUE, 0);
}
