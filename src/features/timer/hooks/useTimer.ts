import { useState, useEffect, useCallback, useRef } from 'react';
import { useInterval } from '../../../shared/hooks';
import { TIMER_UPDATE_INTERVAL, TIMER_WARNING_THRESHOLD } from '../../../core';
import { saveLastTimerValue } from '../services/timerService';
import type { TimerStatus, TimerState } from '../types';

/**
 * Hook quản lý logic Hẹn giờ
 */
export function useTimer(initialDuration: number = 0) {
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [totalDuration, setTotalDuration] = useState(initialDuration);
  const [remainingTime, setRemainingTime] = useState(initialDuration);
  
  const endTimeRef = useRef<number>(0);

  // Phát âm thanh bằng Web Audio API
  const playAlarm = useCallback(() => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // Note A5
    
    // Tạo tiếng bíp lặp lại
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime + 0.4);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
  }, []);

  // Cập nhật đếm ngược
  useInterval(() => {
    if (status === 'running') {
      const now = performance.now();
      const left = Math.max(0, endTimeRef.current - now);
      setRemainingTime(left);

      if (left <= 0) {
        setStatus('finished');
        playAlarm();
      }
    }
  }, status === 'running' ? TIMER_UPDATE_INTERVAL : null);

  const start = useCallback((durationMs?: number) => {
    const d = durationMs !== undefined ? durationMs : remainingTime;
    if (d <= 0) return;

    if (durationMs !== undefined) {
      setTotalDuration(d);
      setRemainingTime(d);
      saveLastTimerValue(d);
    }

    endTimeRef.current = performance.now() + d;
    setStatus('running');
  }, [remainingTime]);

  const pause = useCallback(() => {
    setStatus('paused');
  }, []);

  const resume = useCallback(() => {
    endTimeRef.current = performance.now() + remainingTime;
    setStatus('running');
  }, [remainingTime]);

  const reset = useCallback(() => {
    setStatus('idle');
    setRemainingTime(totalDuration);
  }, [totalDuration]);

  // Cảnh báo khi còn 10% thời gian hoặc dưới ngưỡng cố định
  const isWarning = status === 'running' && (
    remainingTime <= TIMER_WARNING_THRESHOLD * 1000 || 
    remainingTime <= totalDuration * 0.1
  );

  // Ngăn màn hình tắt (Wake Lock API)
  useEffect(() => {
    let wakeLock: any = null;

    const requestWakeLock = async () => {
      if ('wakeLock' in navigator && status === 'running') {
        try {
          wakeLock = await (navigator as any).wakeLock.request('screen');
        } catch (err) {
          console.error('Wake Lock error:', err);
        }
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLock) wakeLock.release();
    };
  }, [status]);

  return {
    totalDuration,
    remainingTime,
    status,
    isWarning,
    start,
    pause,
    resume,
    reset,
    setRemainingTime: (ms: number) => {
      setTotalDuration(ms);
      setRemainingTime(ms);
    }
  };
}
