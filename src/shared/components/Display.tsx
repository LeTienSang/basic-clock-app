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
    xl: 'text-[clamp(3.5rem,12vw,8rem)]',
  };

  const variantClasses = {
    default: 'text-text-primary [text-shadow:0_0_40px_rgba(0,122,255,0.2)] dark:[text-shadow:0_0_60px_rgba(10,132,255,0.4)]',
    danger: 'text-danger animate-timer-pulse [text-shadow:0_0_30px_rgba(255,59,48,0.3)]',
    warning: 'text-warning [text-shadow:0_0_30px_rgba(255,204,0,0.3)]',
    stopwatch: 'text-stopwatch [text-shadow:0_0_40px_rgba(52,199,89,0.2)] dark:[text-shadow:0_0_60px_rgba(48,209,88,0.4)]',
    timer: 'text-timer [text-shadow:0_0_40px_rgba(255,149,0,0.2)] dark:[text-shadow:0_0_60px_rgba(255,159,10,0.4)]',
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 select-none animate-fade-slide-in">
      {label && (
        <span className="text-[11px] md:text-xs font-black text-text-secondary mb-8 uppercase tracking-[0.4em]">
          {label}
        </span>
      )}
      <div className={`flex items-baseline whitespace-nowrap font-display tabular-nums tracking-tight ${sizeClasses[size]} ${variantClasses[variant]} transition-all duration-700 ease-out`}>
        <span className="inline-block hover:scale-[1.02] transition-transform duration-500">{value}</span>
        {ms && (
          <span className="text-[0.35em] opacity-60 ml-3 font-medium tracking-normal shrink-0">
            {ms}
          </span>
        )}
      </div>
    </div>
  );
};
