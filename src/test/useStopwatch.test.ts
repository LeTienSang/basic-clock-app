import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useStopwatch } from '../features/stopwatch/hooks/useStopwatch';

describe('useStopwatch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock performance.now()
    let now = 1000;
    vi.spyOn(performance, 'now').mockImplementation(() => now);
    (performance.now as any).advanceBy = (ms: number) => { now += ms; };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should initialize with idle status and 0 elapsed time', () => {
    const { result } = renderHook(() => useStopwatch());
    expect(result.current.status).toBe('idle');
    expect(result.current.elapsedTime).toBe(0);
  });

  it('should start and update elapsed time', () => {
    const { result } = renderHook(() => useStopwatch());
    
    act(() => {
      result.current.start();
    });
    
    expect(result.current.status).toBe('running');
    
    act(() => {
      (performance.now as any).advanceBy(1000);
      vi.advanceTimersByTime(10); // stopwatch update interval is 10ms
    });
    
    expect(result.current.elapsedTime).toBe(1000);
  });

  it('should record laps correctly', () => {
    const { result } = renderHook(() => useStopwatch());
    
    act(() => {
      result.current.start();
    });
    act(() => {
      (performance.now as any).advanceBy(1000);
      vi.advanceTimersByTime(10);
    });
    act(() => {
      result.current.lap();
    });
    
    expect(result.current.laps).toHaveLength(1);
    expect(result.current.laps[0].totalTime).toBe(1000);
    
    act(() => {
      (performance.now as any).advanceBy(500);
      vi.advanceTimersByTime(10);
    });
    act(() => {
      result.current.lap();
    });
    
    expect(result.current.laps).toHaveLength(2);
    expect(result.current.laps[0].lapTime).toBe(500);
  });

  it('should pause and resume without losing time', () => {
    const { result } = renderHook(() => useStopwatch());
    
    act(() => {
      result.current.start();
    });
    act(() => {
      (performance.now as any).advanceBy(1000);
      vi.advanceTimersByTime(10);
    });
    act(() => {
      result.current.pause();
    });
    
    expect(result.current.elapsedTime).toBe(1000);
    
    act(() => {
      (performance.now as any).advanceBy(2000);
      vi.advanceTimersByTime(10);
    });
    
    expect(result.current.elapsedTime).toBe(1000);
    
    act(() => {
      result.current.start();
    });
    act(() => {
      (performance.now as any).advanceBy(500);
      vi.advanceTimersByTime(10);
    });
    
    expect(result.current.elapsedTime).toBe(1500);
  });
});
