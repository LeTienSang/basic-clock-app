import React from 'react';
import { Button } from '../../../shared/components';
import type { ClockSettings } from '../types';

interface ClockSettingsProps {
  settings: ClockSettings;
  onUpdate: (newSettings: Partial<ClockSettings>) => void;
}

/**
 * Component cài đặt cho Đồng hồ
 */
export const ClockSettingsView: React.FC<ClockSettingsProps> = ({ settings, onUpdate }) => {
  return (
    <div className="flex flex-col items-center gap-8 mt-16 animate-fade-slide-in">
      <div className="flex flex-col items-center gap-5">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary">Cấu hình</span>
        
        <div className="flex items-center gap-5">
          {/* Toggle 12h/24h */}
          <div className="flex glass p-1.5 rounded-3xl">
            <Button
              variant={settings.format === '24h' ? 'clock' : 'ghost'}
              size="sm"
              className={`rounded-2xl transition-all duration-300 ${settings.format === '24h' ? 'shadow-lg' : ''}`}
              onClick={() => onUpdate({ format: '24h' })}
            >
              24H
            </Button>
            <Button
              variant={settings.format === '12h' ? 'clock' : 'ghost'}
              size="sm"
              className={`rounded-2xl transition-all duration-300 ${settings.format === '12h' ? 'shadow-lg' : ''}`}
              onClick={() => onUpdate({ format: '12h' })}
            >
              12H
            </Button>
          </div>

          {/* Toggle Hiện/Ẩn giây */}
          <Button
            variant={settings.showSeconds ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onUpdate({ showSeconds: !settings.showSeconds })}
            className={`glass border-none rounded-2xl px-6 transition-all duration-300 ${settings.showSeconds ? 'text-clock' : ''}`}
          >
            {settings.showSeconds ? 'Hiện giây' : 'Ẩn giây'}
          </Button>
        </div>
      </div>
    </div>
  );
};
