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
        className="w-24 h-28 text-5xl text-center glass border-none rounded-[32px] focus:ring-2 focus:ring-timer/30 outline-none font-display font-light transition-all text-text-primary shadow-none hover:bg-white/10"
      />
      <span className="text-[10px] mt-5 text-text-secondary uppercase font-black tracking-[0.3em]">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-16 py-6 animate-fade-slide-in">
      <div className="flex items-center gap-4">
        <InputField label="Giờ" value={h} onChange={setH} max={99} />
        <span className="text-3xl font-thin opacity-40 mb-10">:</span>
        <InputField label="Phút" value={m} onChange={setM} max={59} />
        <span className="text-3xl font-thin opacity-40 mb-10">:</span>
        <InputField label="Giây" value={s} onChange={setS} max={59} />
      </div>

      <button 
        onClick={handleSubmit} 
        className="w-full max-w-[280px] h-16 rounded-[24px] bg-gradient-to-br from-timer to-[#CC7A00] shadow-[0_8px_30px_rgba(255,149,0,0.3)] text-white text-[12px] font-black uppercase tracking-[0.2em] active:scale-95 hover:scale-105 transition-all duration-300"
      >
        Bắt đầu đếm ngược
      </button>
    </div>
  );
};
