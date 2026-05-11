import React, { useState, useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { TimerDisplay } from './TimerDisplay';
import { TimerInput } from './TimerInput';
import { TimerPresets } from './TimerPresets';
import { Button } from '../../../shared/components';
import { getTimerPresets, getLastTimerValue } from '../services/timerService';
import { useKeyboardShortcuts } from '../../../shared/hooks/useKeyboardShortcuts';

interface TimerContainerProps {
  isActive: boolean;
}

/**
 * Component chính quản lý tính năng Hẹn giờ
 */
export const TimerContainer: React.FC<TimerContainerProps> = ({ isActive }) => {
  const lastValue = getLastTimerValue();
  const {
    remainingTime,
    totalDuration,
    status,
    isWarning,
    start,
    pause,
    resume,
    reset,
  } = useTimer(lastValue);

  // Đăng ký phím tắt
  useKeyboardShortcuts({
    isActive,
    onSpace: status === 'running' ? pause : (status === 'paused' ? resume : undefined),
    onR: reset,
  });

  const presets = getTimerPresets();

  return (
    <div className="flex flex-col items-center justify-center py-6 w-full max-w-lg mx-auto">
      {status === 'idle' ? (
        <>
          <TimerInput onStart={(ms) => start(ms)} />
          <TimerPresets presets={presets} onSelect={(ms) => start(ms)} />
        </>
      ) : (
        <div className="flex flex-col items-center">
          <TimerDisplay 
            remainingTime={remainingTime}
            totalDuration={totalDuration}
            isWarning={isWarning}
            status={status}
          />
          
          <div className="flex gap-4 mt-8">
            {status === 'running' ? (
              <Button variant="secondary" size="md" onClick={pause}>
                Tạm dừng
              </Button>
            ) : status === 'paused' ? (
              <Button variant="primary" size="md" onClick={resume}>
                Tiếp tục
              </Button>
            ) : null}

            {(status === 'paused' || status === 'finished') && (
              <Button variant="ghost" size="md" onClick={reset}>
                Đặt lại
              </Button>
            )}
            
            {status === 'running' && (
              <Button variant="danger" size="md" onClick={reset}>
                Huỷ
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
