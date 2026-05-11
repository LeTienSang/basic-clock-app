import React from 'react';
import { Button } from '../../../shared/components';
import type { TimerPreset } from '../types';

interface TimerPresetsProps {
  presets: TimerPreset[];
  onSelect: (ms: number) => void;
}

/**
 * Danh sách các mốc thời gian nhanh
 */
export const TimerPresets: React.FC<TimerPresetsProps> = ({ presets, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-3 mt-12 w-full max-w-[400px] animate-fade-slide-in">
      {presets.map((preset) => (
        <button
          key={preset.id}
          onClick={() => onSelect(preset.duration * 1000)}
          className="py-4 px-2 rounded-2xl glass text-text-secondary hover:text-timer hover:border-timer/30 transition-all duration-300 font-display font-bold text-xs tracking-widest uppercase active:scale-95 shadow-lg border-none"
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
};
