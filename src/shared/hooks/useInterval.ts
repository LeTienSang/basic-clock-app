import { useEffect, useRef } from 'react';

/**
 * Custom hook quản lý setInterval một cách an toàn trong React
 * @param callback - Hàm sẽ được gọi sau mỗi khoảng delay
 * @param delay - Khoảng thời gian chờ (ms). Truyền null để dừng interval.
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  // Lưu trữ callback mới nhất
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Thiết lập interval
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => {
        savedCallback.current();
      }, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
}
