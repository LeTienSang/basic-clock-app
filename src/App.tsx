import React, { useEffect } from 'react';
import { ClockContainer } from './features/clock';
import { StopwatchContainer } from './features/stopwatch';
import { TimerContainer } from './features/timer';
import { useLocalStorage } from './shared/hooks';
import { IconButton } from './shared/components';
import { STORAGE_KEYS, applyTheme, getSystemTheme, DEFAULT_TAB } from './core';
import type { Theme, ActiveTab } from './shared/types';

/**
 * Component chính của ứng dụng
 */
const App: React.FC = () => {
  // 1. Quản lý Theme
  const [theme, setTheme] = useLocalStorage<Theme>(
    STORAGE_KEYS.THEME,
    getSystemTheme()
  );

  // Áp dụng theme mỗi khi thay đổi
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // 2. Quản lý Tab
  const [activeTab, setActiveTab] = React.useState<ActiveTab>(DEFAULT_TAB);

  // Danh sách các tab
  const tabs = [
    { id: 'clock', label: 'Đồng hồ', icon: '🕒' },
    { id: 'timer', label: 'Hẹn giờ', icon: '⏳' },
    { id: 'stopwatch', label: 'Bấm giờ', icon: '⏱️' },
  ] as const;

  return (
    <div className="min-h-screen bg-bg-base text-text-primary font-ui selection:bg-clock/30 flex flex-col items-center overflow-hidden">
      {/* Background Animated Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-clock/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-float opacity-50"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-timer/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-float opacity-30 [animation-delay:2s]"></div>
      <div className="fixed top-[30%] right-[-5%] w-[30%] h-[30%] bg-stopwatch/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse opacity-40 [animation-delay:4s]"></div>

      {/* Main Content Area */}
      <main className="w-full max-w-[480px] flex-1 flex flex-col relative px-6 pt-12 pb-32 z-10">
        {/* Header - Minimal & Premium */}
        <header className="flex justify-between items-center mb-16 animate-fade-slide-in">
          <div className="flex flex-col">
            <h1 className="text-[10px] font-bold tracking-[0.5em] uppercase text-text-muted">
              Basic Clock
            </h1>
            <div className="h-[1px] w-8 bg-gradient-to-r from-clock/50 to-transparent mt-1"></div>
          </div>
          
          <IconButton 
            onClick={toggleTheme}
            icon={theme === 'dark' ? '☀️' : '🌙'}
            className="shadow-sm dark:shadow-xl"
            variant="filled"
          />
        </header>

        {/* Content Screens */}
        <div className="flex-1 flex flex-col justify-center">
          <div className={`${activeTab === 'clock' ? 'block animate-fade-slide-in' : 'hidden'}`}>
            <ClockContainer />
          </div>
          <div className={`${activeTab === 'timer' ? 'block animate-fade-slide-in' : 'hidden'}`}>
            <TimerContainer isActive={activeTab === 'timer'} />
          </div>
          <div className={`${activeTab === 'stopwatch' ? 'block animate-fade-slide-in' : 'hidden'}`}>
            <StopwatchContainer isActive={activeTab === 'stopwatch'} />
          </div>
        </div>
      </main>

      {/* Premium Tab Bar - Glassmorphism */}
      <nav className="fixed bottom-10 w-[calc(100%-3rem)] max-w-[400px] glass rounded-[32px] p-2 flex gap-1 z-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const accentColor = tab.id === 'clock' ? 'text-clock' : tab.id === 'timer' ? 'text-timer' : 'text-stopwatch';
          const glowColor = tab.id === 'clock' ? 'shadow-clock/20' : tab.id === 'timer' ? 'shadow-timer/20' : 'shadow-stopwatch/20';
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex-1 flex flex-col items-center justify-center py-3.5 rounded-[24px] transition-all duration-500
                ${isActive 
                  ? `${accentColor} bg-white/[0.05] shadow-inner ${glowColor}` 
                  : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.02]'}
              `}
            >
              <span className={`text-xl mb-1.5 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                {tab.icon}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{tab.label}</span>
              
              {/* Active Indicator Glow Line */}
              {isActive && (
                <div className={`absolute bottom-2 w-4 h-[2px] rounded-full ${accentColor.replace('text', 'bg')} shadow-[0_0_8px_currentColor]`} />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default App;
