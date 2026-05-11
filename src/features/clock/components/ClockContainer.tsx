import React from 'react';
import { useClock } from '../hooks/useClock';
import { ClockDisplay } from './ClockDisplay';
import { ClockSettingsView } from './ClockSettings';

/**
 * Component chính quản lý tính năng Đồng hồ
 */
export const ClockContainer: React.FC = () => {
  const { now, settings, updateSettings } = useClock();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-4xl mx-auto">
      <ClockDisplay now={now} settings={settings} />
      <ClockSettingsView settings={settings} onUpdate={updateSettings} />
    </div>
  );
};
