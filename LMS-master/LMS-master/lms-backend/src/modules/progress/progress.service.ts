import { db } from '../../config/db';
import { AppError } from '../../middleware/errorHandler';

export const getSubjectProgress = async (userId: number, subjectId: number) => {
  const sections = await db('sections').where('subject_id', subjectId);
  if (!sections.length) throw new AppError(404, 'Subject not found', 'NotFound');

  const sectionIds = sections.map((s: any) => s.id);
  const videos = await db('videos').whereIn('section_id', sectionIds);
  const total_videos = videos.length;
  
  if (!total_videos) return { total_videos: 0, completed_videos: 0, percent_complete: 0, last_video_id: null, last_position_seconds: null };

  const videoIds = videos.map((v: any) => v.id);
  const progRows = await db('video_progress').where('user_id', userId).whereIn('video_id', videoIds);

  const completed_videos = progRows.filter((p: any) => p.is_completed).length;
  const percent_complete = Math.round((completed_videos / total_videos) * 100);

  const lastWatched = progRows
    .filter((p: any) => p.updated_at)
    .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0];

  return {
    total_videos,
    completed_videos,
    percent_complete,
    last_video_id: lastWatched?.video_id ?? null,
    last_position_seconds: lastWatched?.last_position_seconds ?? null,
  };
};

export const getVideoProgress = async (userId: number, videoId: number) => {
  const row = await db('video_progress').where({ user_id: userId, video_id: videoId }).first();
  return {
    last_position_seconds: row?.last_position_seconds ?? 0,
    is_completed: row?.is_completed ?? false,
  };
};

export const upsertVideoProgress = async (
  userId: number,
  videoId: number,
  last_position_seconds: number,
  is_completed: boolean
) => {
  const video = await db('videos').where('id', videoId).first();
  if (!video) throw new AppError(404, 'Video not found', 'NotFound');

  const maxPos = video.duration_seconds
    ? Math.min(last_position_seconds, video.duration_seconds)
    : last_position_seconds;
  const cappedPos = Math.max(0, maxPos);

  const existing = await db('video_progress').where({ user_id: userId, video_id: videoId }).first();

  if (existing) {
    const updates: any = { last_position_seconds: cappedPos, updated_at: new Date() };
    if (is_completed && !existing.is_completed) {
      updates.is_completed = true;
      updates.completed_at = new Date();
    }
    await db('video_progress').where('id', existing.id).update(updates);
  } else {
    await db('video_progress').insert({
      user_id: userId,
      video_id: videoId,
      last_position_seconds: cappedPos,
      is_completed: is_completed || false,
      completed_at: is_completed ? new Date() : null,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  return getVideoProgress(userId, videoId);
};
