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
    <div className="flex justify-center items-center gap-12 mt-12">
      {/* Nút Lap / Reset */}
      <div className="w-20 flex justify-center">
        {(status === 'running' || status === 'paused') && (
          <button
            onClick={status === 'running' ? onLap : onReset}
            className="w-16 h-16 rounded-full glass text-text-primary text-[10px] font-bold uppercase tracking-widest active:scale-90 transition-all"
          >
            {status === 'running' ? 'Lap' : 'Reset'}
          </button>
        )}
      </div>

      {/* Nút Start / Pause (Chính giữa) */}
      <div className="w-24 flex justify-center">
        {status === 'running' ? (
          <button
            onClick={onPause}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_30px_rgba(239,68,68,0.4)] text-white text-xs font-bold uppercase tracking-widest active:scale-95 transition-all"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={onStart}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_30px_rgba(16,185,129,0.4)] text-gray-900 text-xs font-bold uppercase tracking-widest active:scale-95 transition-all"
          >
            {status === 'idle' ? 'Start' : 'Resume'}
          </button>
        )}
      </div>
      
      {/* Spacer bên phải */}
      <div className="w-20"></div>
    </div>
  );
};
