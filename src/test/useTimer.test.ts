import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTimer } from '../features/timer/hooks/useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    let now = 1000;
    vi.spyOn(performance, 'now').mockImplementation(() => now);
    (performance.now as any).advanceBy = (ms: number) => { now += ms; };
    
    // Mock AudioContext
    (window as any).AudioContext = vi.fn().mockImplementation(function() {
      return {
        createOscillator: vi.fn().mockReturnValue({
          connect: vi.fn(),
          start: vi.fn(),
          stop: vi.fn(),
          type: '',
          frequency: { setValueAtTime: vi.fn() }
        }),
        createGain: vi.fn().mockReturnValue({
          connect: vi.fn(),
          gain: {
            setValueAtTime: vi.fn(),
            linearRampToValueAtTime: vi.fn()
          }
        }),
        destination: {},
        currentTime: 0
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should initialize with idle status and remaining time', () => {
    const { result } = renderHook(() => useTimer(5000));
    expect(result.current.status).toBe('idle');
    expect(result.current.remainingTime).toBe(5000);
  });

  it('should countdown when started', () => {
    const { result } = renderHook(() => useTimer(5000));
    
    act(() => {
      result.current.start();
    });
    
    expect(result.current.status).toBe('running');
    
    act(() => {
      (performance.now as any).advanceBy(1000);
      vi.advanceTimersByTime(100);
    });
    
    expect(result.current.remainingTime).toBe(4000);
  });

  it('should trigger finished status and alarm when time is up', () => {
    const { result } = renderHook(() => useTimer(1000));
    
    act(() => {
      result.current.start();
    });
    act(() => {
      (performance.now as any).advanceBy(1000);
      vi.advanceTimersByTime(100);
    });
    
    expect(result.current.status).toBe('finished');
    expect(result.current.remainingTime).toBe(0);
    expect(window.AudioContext).toHaveBeenCalled();
  });

  it('should show warning state near the end', () => {
    const { result } = renderHook(() => useTimer(10000)); // 10s
    
    act(() => {
      result.current.start();
      (performance.now as any).advanceBy(9500); // 9.5s passed
      vi.advanceTimersByTime(100);
    });
    
    expect(result.current.isWarning).toBe(true);
  });
});
