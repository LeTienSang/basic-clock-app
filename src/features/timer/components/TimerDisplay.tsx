import React from 'react';
import { Display } from '../../../shared/components';
import { formatToHHMMSS } from '../../../shared/utils';

interface TimerDisplayProps {
  remainingTime: number;
  totalDuration: number;
  isWarning: boolean;
  status: 'idle' | 'running' | 'paused' | 'finished';
}

/**
 * Hiển thị thời gian đếm ngược và thanh tiến trình
 */
export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  remainingTime,
  totalDuration,
  isWarning,
  status
}) => {
  const progress = totalDuration > 0 ? (remainingTime / totalDuration) * 100 : 0;
  const timeStr = formatToHHMMSS(remainingTime);

  return (
    <div className="relative flex flex-col items-center py-8">
      {/* Vòng tròn Progress (SVG) */}
      <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-2xl">
          {/* Background circle */}
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            className="stroke-white/5 fill-none"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            className={`fill-none transition-all duration-500 ease-linear ${
              isWarning ? 'stroke-danger' : 'stroke-timer'
            }`}
            strokeWidth="4"
            strokeDasharray="301.6%"
            strokeDashoffset={`${301.6 - (301.6 * progress) / 100}%`}
            strokeLinecap="round"
          />
        </svg>

        {/* Thời gian hiển thị ở giữa */}
        <div className="relative z-10 scale-110">
          <Display 
            value={timeStr} 
            variant={isWarning ? 'danger' : 'timer'}
            size="lg"
            label={status === 'finished' ? 'HOÀN THÀNH' : ''}
          />
        </div>
      </div>
    </div>
  );
};
