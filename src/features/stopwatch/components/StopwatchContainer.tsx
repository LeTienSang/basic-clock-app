import React from 'react';
import { useStopwatch } from '../hooks/useStopwatch';
import { StopwatchDisplay } from './StopwatchDisplay';
import { StopwatchControls } from './StopwatchControls';
import { LapList } from './LapList';
import { useKeyboardShortcuts } from '../../../shared/hooks/useKeyboardShortcuts';

interface StopwatchContainerProps {
  isActive: boolean;
}

/**
 * Component chính quản lý tính năng Bấm giờ
 */
export const StopwatchContainer: React.FC<StopwatchContainerProps> = ({ isActive }) => {
  const {
    elapsedTime,
    status,
    laps,
    start,
    pause,
    reset,
    lap
  } = useStopwatch();

  // Đăng ký phím tắt
  useKeyboardShortcuts({
    isActive,
    onSpace: status === 'running' ? pause : start,
    onR: reset,
    onL: status === 'running' ? lap : undefined,
  });

  return (
    <div className="flex flex-col items-center justify-center py-10 w-full max-w-lg mx-auto">
      <StopwatchDisplay elapsedTime={elapsedTime} />
      
      <StopwatchControls 
        status={status}
        onStart={start}
        onPause={pause}
        onReset={reset}
        onLap={lap}
      />

      <LapList laps={laps} />
    </div>
  );
};
