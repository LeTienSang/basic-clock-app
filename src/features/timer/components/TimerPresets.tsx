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
    <div className="flex flex-col items-center gap-6 mt-12 w-full animate-fade-slide-in">
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary">Mốc nhanh</span>
      <div className="grid grid-cols-3 gap-4 w-full max-w-[440px]">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset.duration * 1000)}
            className="group relative py-5 px-3 rounded-[24px] glass text-text-secondary hover:text-timer transition-all duration-500 font-display font-black text-[11px] tracking-widest uppercase active:scale-95 border-none shadow-none hover:shadow-[0_8px_25px_rgba(255,149,0,0.1)] overflow-hidden"
          >
            <span className="relative z-10 transition-transform duration-500 group-hover:scale-110 block">
              {preset.label}
            </span>
            <div className="absolute inset-0 bg-gradient-to-br from-timer/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        ))}
      </div>
    </div>
  );
};
