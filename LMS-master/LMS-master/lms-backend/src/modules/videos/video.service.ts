import { AppError } from '../../middleware/errorHandler';
import * as repo from './video.repository';

export const getVideo = async (videoId: number, userId: number) => {
  const video = await repo.findVideoWithMeta(videoId, userId);
  if (!video) throw new AppError(404, 'Video not found', 'NotFound');
  return video;
};

export const getFirstVideo = async (subjectId: number, userId: number) => {
  const video = await repo.findFirstUnlockedVideo(subjectId, userId);
  if (!video) throw new AppError(404, 'No videos found', 'NotFound');
  return video;
};
