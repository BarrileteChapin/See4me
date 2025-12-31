import { useCallback } from 'react';

export const useHapticFeedback = () => {
  const vibrate = useCallback((pattern: number | number[] = 50) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  const tap = useCallback(() => vibrate(30), [vibrate]);
  const success = useCallback(() => vibrate([50, 50, 100]), [vibrate]);
  const error = useCallback(() => vibrate([100, 50, 100, 50, 100]), [vibrate]);

  return { vibrate, tap, success, error };
};
