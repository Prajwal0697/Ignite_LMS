import apiClient from './apiClient';

const timers: Record<number, ReturnType<typeof setTimeout>> = {};

export const sendProgress = (
  videoId: number,
  last_position_seconds: number,
  is_completed: boolean
) => {
  if (timers[videoId]) clearTimeout(timers[videoId]);
  timers[videoId] = setTimeout(async () => {
    try {
      await apiClient.post(`/progress/videos/${videoId}`, { last_position_seconds, is_completed });
    } catch (e) {
      console.error('[progress] Failed to save:', e);
    }
  }, 3000);
};

export const sendProgressImmediate = async (
  videoId: number,
  last_position_seconds: number,
  is_completed: boolean
) => {
  if (timers[videoId]) clearTimeout(timers[videoId]);
  try {
    await apiClient.post(`/progress/videos/${videoId}`, { last_position_seconds, is_completed });
  } catch (e) {
    console.error('[progress] Immediate save failed:', e);
  }
};
