// core/index.ts — Public API của core module

export {
  STORAGE_PREFIX,
  STORAGE_KEYS,
  setStorageItem,
  getStorageItem,
  removeStorageItem,
  clearAppStorage,
} from './storage';

export {
  APP_NAME,
  TIME_FORMATS,
  TIMER_STATUS,
  STOPWATCH_STATUS,
  CLOCK_UPDATE_INTERVAL,
  STOPWATCH_UPDATE_INTERVAL,
  TIMER_UPDATE_INTERVAL,
  TIMER_WARNING_THRESHOLD,
  MAX_LAPS,
  DEFAULT_TAB,
  MS_IN_SECOND,
  MS_IN_MINUTE,
  MS_IN_HOUR,
  MS_IN_DAY,
} from './constants';

export { DEFAULT_THEME, applyTheme, getSystemTheme } from './theme';
