import React from 'react';
import { Display } from '../../../shared/components';
import { formatVietnameseFullDate, formatTimeDisplay } from '../../../shared/utils';
import type { ClockSettings } from '../types';

interface ClockDisplayProps {
  /** Thời gian hiện tại */
  now: Date;
  /** Cài đặt hiển thị */
  settings: ClockSettings;
}

/**
 * Component hiển thị đồng hồ số và ngày tháng
 */
export const ClockDisplay: React.FC<ClockDisplayProps> = ({ now, settings }) => {
  const is12h = settings.format === '12h';
  
  // Format hours and minutes
  const hours = now.getHours();
  const displayHours = is12h ? (hours % 12 || 12).toString().padStart(2, '0') : hours.toString().padStart(2, '0');
  const displayMinutes = now.getMinutes().toString().padStart(2, '0');
  const displaySeconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = is12h ? (hours >= 12 ? ' PM' : ' AM') : '';

  const timeNode = (
    <span className="flex items-center">
      <span>{displayHours}</span>
      <span className="animate-blink mx-1 opacity-100">:</span>
      <span>{displayMinutes}</span>
      {settings.showSeconds && (
        <>
          <span className="animate-blink mx-1 opacity-100">:</span>
          <span className="text-[0.6em] opacity-80">{displaySeconds}</span>
        </>
      )}
      {ampm && <span className="text-[0.4em] ml-2 opacity-40 font-light tracking-normal">{ampm}</span>}
    </span>
  );

  const dateStr = formatVietnameseFullDate(now);

  return (
    <div className="w-full flex flex-col items-center">
      <Display 
        value={timeNode} 
        label={dateStr}
        size="xl"
        variant="default"
      />
    </div>
  );
};
