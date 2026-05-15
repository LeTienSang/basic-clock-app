import React from 'react';
import { Button } from '../../../shared/components';
import type { StopwatchStatus } from '../types';

interface StopwatchControlsProps {
  status: StopwatchStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onLap: () => void;
}

/**
 * Các nút điều khiển cho Bấm giờ
 */
export const StopwatchControls: React.FC<StopwatchControlsProps> = ({
  status,
  onStart,
  onPause,
  onReset,
  onLap,
}) => {
  return (
    <div className="flex justify-center items-center gap-8 md:gap-16 mt-12 md:mt-16 animate-fade-slide-in w-full">
      {/* Nút Lap / Reset */}
      <div className="flex-1 flex justify-end">
        {(status === 'running' || status === 'paused') && (
          <button
            onClick={status === 'running' ? onLap : onReset}
            className="w-20 h-20 rounded-full glass text-text-primary text-[10px] font-black uppercase tracking-[0.2em] active:scale-90 transition-all duration-300 hover:scale-105"
          >
            {status === 'running' ? 'Vòng' : 'Đặt lại'}
          </button>
        )}
      </div>

      {/* Nút Start / Pause (Chính giữa) */}
      <div className="flex-none flex justify-center">
        {status === 'running' ? (
          <button
            onClick={onPause}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-danger to-[#CC2D25] shadow-[0_8px_30px_rgba(255,59,48,0.3)] text-white text-[11px] font-black uppercase tracking-[0.2em] active:scale-95 transition-all duration-300 hover:scale-110"
          >
            Tạm dừng
          </button>
        ) : (
          <button
            onClick={onStart}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-stopwatch to-[#289D46] shadow-[0_8px_30px_rgba(52,199,89,0.3)] text-white text-[11px] font-black uppercase tracking-[0.2em] active:scale-95 transition-all duration-300 hover:scale-110"
          >
            {status === 'idle' ? 'Bắt đầu' : 'Tiếp tục'}
          </button>
        )}
      </div>
      
      {/* Nút ảo hoặc khoảng trống bên phải để cân bằng */}
      <div className="flex-1 flex justify-start">
      </div>
    </div>
  );
};
