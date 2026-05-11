import React from 'react';
import { Display } from '../../../shared/components';
import { formatToHHMMSS, padZero } from '../../../shared/utils';

interface StopwatchDisplayProps {
  /** Tổng thời gian trôi qua (ms) */
  elapsedTime: number;
}

/**
 * Component hiển thị thời gian bấm giờ
 */
export const StopwatchDisplay: React.FC<StopwatchDisplayProps> = ({ elapsedTime }) => {
  // Format phần chính HH:MM:SS
  const mainTime = formatToHHMMSS(elapsedTime);
  
  // Format phần milliseconds (lấy 2 chữ số đầu cho gọn hoặc 3 tùy ý)
  const ms = `.${padZero(Math.floor(elapsedTime % 1000 / 10), 2)}`;

  return (
    <Display 
      value={mainTime} 
      ms={ms}
      size="xl"
      label="Stopwatch"
      variant="stopwatch"
    />
  );
};
