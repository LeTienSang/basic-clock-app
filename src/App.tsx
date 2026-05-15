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
    <div className="min-h-screen bg-bg-base text-text-primary font-ui selection:bg-clock/30 flex flex-col items-center overflow-y-auto overflow-x-hidden">
      {/* Background Animated Glows - Refined */}
      <div className="fixed top-[-10%] left-[-10%] w-[70%] h-[70%] bg-clock/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-float opacity-40"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-timer/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-float opacity-20 [animation-delay:3s]"></div>
      <div className="fixed top-[20%] right-[-15%] w-[40%] h-[40%] bg-stopwatch/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse opacity-30 [animation-delay:5s]"></div>

      {/* Main Content Area */}
      <main className="w-full max-w-[520px] min-h-screen flex flex-col relative px-8 pt-16 pb-48 z-10">
        {/* Header - Refined & Premium */}
        <header className="flex justify-between items-end mb-20 animate-fade-slide-in">
          <div className="flex flex-col">
            <h1 className="text-[11px] font-black tracking-[0.6em] uppercase text-text-muted flex items-center gap-3">
              <span>Basic Clock</span>
              <span className="w-1.5 h-1.5 rounded-full bg-clock shadow-[0_0_8px_var(--color-clock)]"></span>
            </h1>
            <p className="text-[10px] text-text-secondary mt-2 font-medium tracking-widest uppercase">Ứng dụng đồng hồ đơn giản</p>
          </div>
          
          <IconButton 
            onClick={toggleTheme}
            icon={theme === 'dark' ? '✨' : '🌙'} 
            className="w-12 h-12 glass hover:scale-110 active:scale-95 transition-all duration-300"
            variant="filled"
          />
        </header>

        {/* Content Screens */}
        <div className="flex-1 flex flex-col justify-center items-center min-h-[300px]">
          <div className={`${activeTab === 'clock' ? 'contents animate-fade-slide-in' : 'hidden'}`}>
            <ClockContainer />
          </div>
          <div className={`${activeTab === 'timer' ? 'contents animate-fade-slide-in' : 'hidden'}`}>
            <TimerContainer isActive={activeTab === 'timer'} />
          </div>
          <div className={`${activeTab === 'stopwatch' ? 'contents animate-fade-slide-in' : 'hidden'}`}>
            <StopwatchContainer isActive={activeTab === 'stopwatch'} />
          </div>
        </div>
      </main>

      {/* Premium Tab Bar - iOS Style Floating Dock */}
      <nav className="fixed bottom-12 w-[calc(100%-4rem)] max-w-[420px] glass rounded-[40px] p-2.5 flex gap-1.5 z-50">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const accentColor = tab.id === 'clock' ? 'text-clock' : tab.id === 'timer' ? 'text-timer' : 'text-stopwatch';
          const bgColor = tab.id === 'clock' ? 'bg-clock/10' : tab.id === 'timer' ? 'bg-timer/10' : 'bg-stopwatch/10';
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex-1 flex flex-col items-center justify-center py-4 rounded-[30px] transition-all duration-500
                ${isActive 
                  ? `${accentColor} ${bgColor} shadow-[0_4px_20px_rgba(0,0,0,0.05)]` 
                  : 'text-text-muted hover:text-text-secondary hover:bg-black/5 dark:hover:bg-white/5'}
              `}
            >
              <span className={`text-2xl mb-1.5 transition-all duration-500 ${isActive ? 'scale-110 -translate-y-0.5' : 'scale-100'}`}>
                {tab.icon}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-[0.15em] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {tab.label}
              </span>
              
              {/* Active Indicator Dot */}
              {isActive && (
                <div className={`absolute bottom-2.5 w-1 h-1 rounded-full ${accentColor.replace('text', 'bg')} shadow-[0_0_10px_currentColor]`} />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default App;
