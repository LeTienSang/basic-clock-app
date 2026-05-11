import React from 'react';
import { Button } from './Button';

interface ModalProps {
  /** Trạng thái đóng/mở */
  isOpen: boolean;
  /** Hàm xử lý khi nhấn đóng */
  onClose: () => void;
  /** Tiêu đề của modal */
  title: string;
  /** Nội dung thông báo */
  message: string;
  /** Text cho nút xác nhận (mặc định: "Đồng ý") */
  confirmText?: string;
  /** Text cho nút huỷ (mặc định: "Huỷ") */
  cancelText?: string;
  /** Hàm xử lý khi xác nhận */
  onConfirm: () => void;
  /** Loại modal để đổi màu nút xác nhận */
  type?: 'default' | 'danger';
}

/**
 * Dialog xác nhận hành động
 * @example <Modal isOpen={show} onClose={...} onConfirm={...} title="Xoá Lap" message="..." type="danger" />
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = 'Đồng ý',
  cancelText = 'Huỷ',
  onConfirm,
  type = 'default',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all border border-gray-200 dark:border-gray-800">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {message}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <Button variant="ghost" onClick={onClose} className="w-full sm:w-auto">
            {cancelText}
          </Button>
          <Button 
            variant={type === 'danger' ? 'danger' : 'primary'} 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full sm:w-auto"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
