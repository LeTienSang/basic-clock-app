import React from 'react';
import { formatToHHMMSS, padZero } from '../../../shared/utils';
import type { LapRecord } from '../types';

interface LapListProps {
  laps: LapRecord[];
}

/**
 * Danh sách các mốc thời gian (Lap)
 */
export const LapList: React.FC<LapListProps> = ({ laps }) => {
  if (laps.length === 0) return null;

  const formatLapTime = (ms: number) => {
    const main = formatToHHMMSS(ms);
    const mss = padZero(Math.floor(ms % 1000 / 10), 2);
    return `${main}.${mss}`;
  };

  return (
    <div className="w-full max-w-md mt-12 animate-fade-slide-in">
      <div className="flex justify-between px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-50">
        <span>LAP</span>
        <span>SPLIT</span>
        <span>TOTAL</span>
      </div>
      
      <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar">
        {laps.map((lap) => (
          <div 
            key={lap.id}
            className={`flex justify-between items-center px-6 py-4 rounded-2xl glass transition-all duration-300 border-none ${
              lap.type === 'fastest' ? 'text-stopwatch bg-stopwatch/10' :
              lap.type === 'slowest' ? 'text-danger bg-danger/10' :
              'text-text-secondary hover:text-text-primary'
            }`}
          >
            <span className="font-display font-bold text-xs">#{lap.id.toString().padStart(2, '0')}</span>
            <span className="font-display text-sm font-medium">+{formatLapTime(lap.lapTime)}</span>
            <span className="font-display text-[11px] opacity-40">{formatLapTime(lap.totalTime)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
