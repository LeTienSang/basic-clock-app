import type { LapRecord } from '../types';

/**
 * Tìm lap nhanh nhất và chậm nhất trong danh sách
 * @param laps - Danh sách các lap
 * @returns Object chứa id của fastest và slowest lap
 */
export function findExtremeLaps(laps: LapRecord[]): { fastestId: number | null, slowestId: number | null } {
  if (laps.length < 2) return { fastestId: null, slowestId: null };

  let fastest = laps[0];
  let slowest = laps[0];

  laps.forEach(lap => {
    if (lap.lapTime < fastest.lapTime) fastest = lap;
    if (lap.lapTime > slowest.lapTime) slowest = lap;
  });

  return {
    fastestId: fastest.id,
    slowestId: slowest.id
  };
}

/**
 * Gán nhãn fastest/slowest cho các lap trong danh sách
 * @param laps - Danh sách lap gốc
 * @returns Danh sách lap đã được gán nhãn
 */
export function markLaps(laps: LapRecord[]): LapRecord[] {
  const { fastestId, slowestId } = findExtremeLaps(laps);
  
  return laps.map(lap => ({
    ...lap,
    type: lap.id === fastestId ? 'fastest' : lap.id === slowestId ? 'slowest' : 'normal'
  }));
}
