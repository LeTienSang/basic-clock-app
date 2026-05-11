import { useState, useCallback } from 'react';
import { getStorageItem, setStorageItem } from '../../core/storage';

/**
 * Custom hook quản lý dữ liệu trong localStorage với tính đồng bộ React state
 * @param key - Key trong localStorage
 * @param defaultValue - Giá trị mặc định
 */
export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  // Lấy giá trị khởi tạo từ localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getStorageItem<T>(key, defaultValue);
  });

  // Hàm cập nhật cả state và localStorage
  const setValue = useCallback((value: T) => {
    setStoredValue(value);
    setStorageItem(key, value);
  }, [key]);

  return [storedValue, setValue];
}
