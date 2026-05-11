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
    <div className="flex flex-col items-center gap-6 mt-12 animate-fade-slide-in">
      <div className="flex items-center gap-4">
        {/* Toggle 12h/24h */}
        <div className="flex glass p-1 rounded-full">
          <Button
            variant={settings.format === '24h' ? 'clock' : 'ghost'}
            size="sm"
            onClick={() => onUpdate({ format: '24h' })}
          >
            24H
          </Button>
          <Button
            variant={settings.format === '12h' ? 'clock' : 'ghost'}
            size="sm"
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
          className="glass border-none"
        >
          {settings.showSeconds ? 'Có giây' : 'Không giây'}
        </Button>
      </div>
    </div>
  );
};
