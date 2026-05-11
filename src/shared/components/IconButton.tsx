import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Component Icon hoặc SVG */
  icon: React.ReactNode;
  /** Tooltip hiển thị khi hover (title thuộc tính HTML) */
  tooltip?: string;
  /** Kích thước nút */
  size?: 'sm' | 'md' | 'lg';
  /** Màu sắc */
  variant?: 'ghost' | 'filled';
}

/**
 * Nút Icon hình tròn có tooltip
 * @example <IconButton icon={<SunIcon />} tooltip="Chế độ sáng" />
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  tooltip,
  size = 'md',
  variant = 'ghost',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
  };

  const variantClasses = {
    ghost: 'hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary hover:text-text-primary border border-transparent hover:border-black/5 dark:hover:border-white/10',
    filled: 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-text-primary border border-black/5 dark:border-white/10',
  };

  return (
    <button
      title={tooltip}
      className={`rounded-full flex items-center justify-center transition-all duration-150 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
    </button>
  );
};
