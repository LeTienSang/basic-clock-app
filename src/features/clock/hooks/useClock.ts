import { useState, useEffect } from 'react';
import { getCurrentTime } from '../services/clockService';
import { useLocalStorage, useInterval } from '../../../shared/hooks';
import { STORAGE_KEYS, CLOCK_UPDATE_INTERVAL } from '../../../core';
import type { ClockState, ClockSettings } from '../types';

/**
 * Hook quản lý logic cho Đồng hồ số
 * Tự động cập nhật thời gian mỗi giây và đồng bộ cài đặt với localStorage
 */
export function useClock(): ClockState & {
  updateSettings: (newSettings: Partial<ClockSettings>) => void;
} {
  // 1. Quản lý cài đặt (lưu vào localStorage)
  const [settings, setSettings] = useLocalStorage<ClockSettings>(
    STORAGE_KEYS.CLOCK_FORMAT,
    { format: '24h', showSeconds: true }
  );

  // 2. Quản lý thời gian hiện tại
  const [now, setNow] = useState(getCurrentTime());

  // 3. Cập nhật thời gian mỗi giây
  useInterval(() => {
    setNow(getCurrentTime());
  }, CLOCK_UPDATE_INTERVAL);

  // 4. Xử lý khi máy tính ngủ/thức dậy (Page Visibility API)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setNow(getCurrentTime());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  /**
   * Cập nhật cài đặt đồng hồ
   */
  const updateSettings = (newSettings: Partial<ClockSettings>) => {
    setSettings({ ...settings, ...newSettings });
  };

  return {
    now,
    settings,
    updateSettings,
  };
}
