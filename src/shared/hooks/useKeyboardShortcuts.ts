import { useEffect } from 'react';

interface ShortcutOptions {
  onSpace?: () => void;
  onR?: () => void;
  onL?: () => void;
  /** Chỉ kích hoạt khi tab đang active */
  isActive: boolean;
}

/**
 * Hook quản lý phím tắt bàn phím
 */
export function useKeyboardShortcuts({ onSpace, onR, onL, isActive }: ShortcutOptions) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Tránh kích hoạt khi đang gõ vào input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = event.key.toLowerCase();

      if (key === ' ' && onSpace) {
        event.preventDefault(); // Ngăn cuộn trang
        onSpace();
      } else if (key === 'r' && onR) {
        onR();
      } else if (key === 'l' && onL) {
        onL();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSpace, onR, onL, isActive]);
}
