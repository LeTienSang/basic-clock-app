import React, { useState } from 'react';
import { Button } from '../../../shared/components';
import { padZero } from '../../../shared/utils';

interface TimerInputProps {
  onStart: (ms: number) => void;
}

/**
 * Component nhập thời gian cho Timer
 */
export const TimerInput: React.FC<TimerInputProps> = ({ onStart }) => {
  const [h, setH] = useState(0);
  const [m, setM] = useState(0);
  const [s, setS] = useState(0);

  const handleSubmit = () => {
    const totalMs = (h * 3600 + m * 60 + s) * 1000;
    if (totalMs > 0) {
      onStart(totalMs);
    }
  };

  const InputField = ({ label, value, onChange, max }: any) => (
    <div className="flex flex-col items-center">
      <input
        type="number"
        value={padZero(value)}
        onChange={(e) => {
          const val = Math.min(max, Math.max(0, parseInt(e.target.value) || 0));
          onChange(val);
        }}
        className="w-20 h-24 text-4xl text-center bg-bg-input border border-white/5 rounded-[16px] focus:ring-1 focus:ring-timer/50 focus:bg-white/5 outline-none font-display font-light transition-all text-text-primary"
      />
      <span className="text-[10px] mt-4 text-text-muted uppercase font-bold tracking-[0.2em]">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-12 py-4 animate-fade-slide-in">
      <div className="flex items-center gap-3">
        <InputField label="HRS" value={h} onChange={setH} max={99} />
        <span className="text-2xl font-light opacity-20 mb-8">:</span>
        <InputField label="MIN" value={m} onChange={setM} max={59} />
        <span className="text-2xl font-light opacity-20 mb-8">:</span>
        <InputField label="SEC" value={s} onChange={setS} max={59} />
      </div>

      <button 
        onClick={handleSubmit} 
        className="w-full max-w-[240px] h-14 rounded-full bg-gradient-to-br from-timer to-amber-700 shadow-[0_0_20px_rgba(245,158,11,0.3)] text-gray-900 text-xs font-bold uppercase tracking-[0.2em] active:scale-95 transition-all"
      >
        Start Timer
      </button>
    </div>
  );
};
