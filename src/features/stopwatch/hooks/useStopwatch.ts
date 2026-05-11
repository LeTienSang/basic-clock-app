import { useState, useRef, useCallback } from 'react';
import { useInterval } from '../../../shared/hooks';
import { STOPWATCH_UPDATE_INTERVAL } from '../../../core';
import { markLaps } from '../services/stopwatchService';
import type { StopwatchState, StopwatchStatus, LapRecord } from '../types';

/**
 * Hook quản lý logic Bấm giờ với độ chính xác cao
 */
export function useStopwatch() {
  const [status, setStatus] = useState<StopwatchStatus>('idle');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<LapRecord[]>([]);

  // Refs để theo dõi thời gian chính xác
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  // Cập nhật hiển thị
  useInterval(() => {
    if (status === 'running') {
      setElapsedTime(performance.now() - startTimeRef.current);
    }
  }, status === 'running' ? STOPWATCH_UPDATE_INTERVAL : null);

  const start = useCallback(() => {
    const now = performance.now();
    if (status === 'idle') {
      startTimeRef.current = now;
    } else if (status === 'paused') {
      startTimeRef.current = now - pausedTimeRef.current;
    }
    setStatus('running');
  }, [status]);

  const pause = useCallback(() => {
    pausedTimeRef.current = performance.now() - startTimeRef.current;
    setStatus('paused');
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setElapsedTime(0);
    setLaps([]);
    startTimeRef.current = 0;
    pausedTimeRef.current = 0;
  }, []);

  const lap = useCallback(() => {
    if (laps.length >= 99) return; // Giới hạn tối đa 99 laps

    const currentTotal = performance.now() - startTimeRef.current;
    const lastTotal = laps.length > 0 ? laps[0].totalTime : 0;
    const lapTime = currentTotal - lastTotal;

    const newLap: LapRecord = {
      id: laps.length + 1,
      totalTime: currentTotal,
      lapTime: lapTime
    };

    // Thêm vào đầu danh sách và cập nhật nhãn fastest/slowest
    setLaps(prevLaps => markLaps([newLap, ...prevLaps]));
  }, [laps.length]);

  return {
    elapsedTime,
    status,
    laps,
    start,
    pause,
    reset,
    lap
  };
}
