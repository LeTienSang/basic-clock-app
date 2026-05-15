import React from 'react';

/**
 * Các kiểu dáng của Button
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'clock' | 'stopwatch' | 'timer';

/**
 * Các kích thước của Button
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Kiểu dáng của nút */
  variant?: ButtonVariant;
  /** Kích thước của nút */
  size?: ButtonSize;
  /** Trạng thái đang tải */
  isLoading?: boolean;
}

/**
 * Component Button dùng chung
 * @example <Button variant="primary" onClick={...}>Bắt đầu</Button>
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-bold tracking-widest uppercase transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/20 disabled:opacity-30 disabled:pointer-events-none rounded-full select-none';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-br from-clock to-[#0056D2] text-white shadow-[0_4px_15px_rgba(0,122,255,0.3)] hover:shadow-[0_8px_25px_rgba(0,122,255,0.4)]',
    secondary: 'glass text-text-primary',
    danger: 'bg-gradient-to-br from-danger to-[#CC2D25] text-white shadow-[0_4px_15px_rgba(255,59,48,0.3)] hover:shadow-[0_8px_25px_rgba(255,59,48,0.4)]',
    ghost: 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary hover:text-text-primary',
    clock: 'bg-gradient-to-br from-clock to-[#0056D2] text-white shadow-[0_4px_15px_rgba(0,122,255,0.3)]',
    stopwatch: 'bg-gradient-to-br from-stopwatch to-[#289D46] text-white shadow-[0_4px_15px_rgba(52,199,89,0.3)]',
    timer: 'bg-gradient-to-br from-timer to-[#CC7A00] text-white shadow-[0_4px_15px_rgba(255,149,0,0.3)]',
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-10 py-4 text-sm',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.primary} ${sizeClasses[size]} ${className}`;

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};
