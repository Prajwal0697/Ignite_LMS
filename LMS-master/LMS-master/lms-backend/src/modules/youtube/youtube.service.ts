import YouTube from 'youtube-sr';
import { env } from '../../config/env';
import { AppError } from '../../middleware/errorHandler';

export const searchVideos = async (query: string) => {
  try {
    // If API key exists, we could use it, but youtube-sr is more reliable without one
    const results = await YouTube.search(query, { limit: 6, type: 'video' });

    return results.map((item: any) => ({
      videoId: item.id,
      title: item.title,
      thumbnail: item.thumbnail?.url,
    }));
  } catch (error: any) {
    console.error('YouTube-SR Error:', error.message);
    throw new AppError(500, 'Failed to fetch videos from YouTube', 'ExternalApiError');
  }
};
