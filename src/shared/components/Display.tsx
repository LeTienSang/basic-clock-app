import React from 'react';

interface DisplayProps {
  /** Giá trị thời gian chính */
  value: React.ReactNode;
  /** Phần millisecond (nếu có, ví dụ: ".456") */
  ms?: string;
  /** Nhãn phụ phía trên hoặc dưới (ví dụ: "Đang đếm ngược") */
  label?: string;
  /** Kích thước chữ */
  size?: 'md' | 'lg' | 'xl';
  /** Màu sắc đặc biệt */
  variant?: 'default' | 'danger' | 'warning' | 'stopwatch' | 'timer';
}

/**
 * Component hiển thị số thời gian lớn, tối giản
 * @example <Display value="00:25:00" label="Timer" size="xl" />
 */
export const Display: React.FC<DisplayProps> = ({
  value,
  ms,
  label,
  size = 'lg',
  variant = 'default',
}) => {
  const sizeClasses = {
    md: 'text-[clamp(2.5rem,10vw,4rem)]',
    lg: 'text-[clamp(3.5rem,12vw,6rem)]',
    xl: 'text-[clamp(4rem,15vw,9rem)]',
  };

  const variantClasses = {
    default: 'text-text-primary [text-shadow:var(--shadow-glow-clock)]',
    danger: 'text-danger animate-timer-pulse',
    warning: 'text-warning',
    stopwatch: 'text-stopwatch [text-shadow:var(--shadow-glow-stopwatch)]',
    timer: 'text-timer [text-shadow:var(--shadow-glow-timer)]',
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 select-none animate-fade-slide-in">
      {label && (
        <span className="text-[10px] md:text-xs font-bold text-text-secondary mb-4 uppercase tracking-[0.3em] opacity-60">
          {label}
        </span>
      )}
      <div className={`font-display tabular-nums tracking-wider ${sizeClasses[size]} ${variantClasses[variant]} transition-all duration-500`}>
        <span>{value}</span>
        {ms && (
          <span className="text-[0.4em] opacity-40 ml-2 font-light">
            {ms}
          </span>
        )}
      </div>
    </div>
  );
};
