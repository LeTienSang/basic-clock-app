// core/theme.ts — Cấu hình theme (Dark / Light mode)
// Triển khai logic chuyển đổi theme bằng cách thêm/xoá class trên <html>

import type { Theme } from '../shared/types';

/** Theme mặc định */
export const DEFAULT_THEME: Theme = 'dark';

/**
 * Áp dụng theme lên document root (<html>)
 * @param theme - Theme cần áp dụng ('light' hoặc 'dark')
 */
export function applyTheme(theme: Theme): void {
  const root = window.document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * Đọc theme từ system preference (prefers-color-scheme)
 * @returns 'dark' nếu hệ thống đang dùng dark mode, ngược lại 'light'
 */
export function getSystemTheme(): Theme {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return DEFAULT_THEME;
}
