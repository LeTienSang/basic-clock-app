import { describe, it, expect } from 'vitest';
import { formatToHHMMSS, formatToMMSSMs, padZero } from '../shared/utils/timeFormatter';

describe('timeFormatter', () => {
  describe('padZero', () => {
    it('should pad single digit numbers', () => {
      expect(padZero(5)).toBe('05');
      expect(padZero(0)).toBe('00');
    });

    it('should not pad double digit numbers', () => {
      expect(padZero(12)).toBe('12');
    });

    it('should pad to custom length', () => {
      expect(padZero(5, 3)).toBe('005');
    });
  });

  describe('formatToHHMMSS', () => {
    it('should format 0ms to 00:00:00', () => {
      expect(formatToHHMMSS(0)).toBe('00:00:00');
    });

    it('should format 1 second', () => {
      expect(formatToHHMMSS(1000)).toBe('00:00:01');
    });

    it('should format 1 minute', () => {
      expect(formatToHHMMSS(60000)).toBe('00:01:00');
    });

    it('should format hours correctly', () => {
      expect(formatToHHMMSS(3600000)).toBe('01:00:00');
    });

    it('should handle large values (99:59:59)', () => {
      const ms = (99 * 3600 + 59 * 60 + 59) * 1000;
      expect(formatToHHMMSS(ms)).toBe('99:59:59');
    });
  });

  describe('formatToMMSSMs', () => {
    it('should format with milliseconds', () => {
      expect(formatToMMSSMs(1234)).toBe('00:01.234');
    });

    it('should pad milliseconds to 3 digits', () => {
      expect(formatToMMSSMs(5)).toBe('00:00.005');
    });
  });
});
