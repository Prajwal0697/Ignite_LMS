import { db } from '../../config/db';

export const findAllPublished = async (page: number, pageSize: number, q?: string, category?: string) => {
  const query = db('subjects as s')
    .select('s.*')
    .select(db.raw('(SELECT count(*) FROM videos v JOIN sections sec ON v.section_id = sec.id WHERE sec.subject_id = s.id) as total_lessons'))
    .where('s.is_published', true);

  if (q) {
    query.where('s.title', 'like', `%${q}%`);
  }

  if (category && category !== 'All Courses') {
    query.where('s.category', category);
  }

  const totalRes = await query.clone().clearSelect().count('* as count').first();
  const total = Number(totalRes?.count || 0);

  const subjects = await query
    .orderBy('s.created_at', 'desc')
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return { subjects, total, page, pageSize };
};

export const findById = async (id: number) => {
  return db('subjects').where('id', id).first();
};

export const findAllVideosBySubject = async (subjectId: number) => {
  return db('videos')
    .join('sections', 'videos.section_id', 'sections.id')
    .where('sections.subject_id', subjectId)
    .select('videos.*')
    .orderBy('sections.order_index')
    .orderBy('videos.order_index');
};

export const findBySlug = async (slug: string) => {
  return db('subjects').where('slug', slug).first();
};

export const findTreeWithProgress = async (subjectId: number, userId: number) => {
  const sections = await db('sections').where('subject_id', subjectId).orderBy('order_index');
  const sectionIds = sections.map((s: any) => s.id);

  const videos = sectionIds.length
    ? await db('videos').whereIn('section_id', sectionIds).orderBy('order_index')
    : [];

  const progressRows = userId && videos.length
    ? await db('video_progress').where('user_id', userId).whereIn('video_id', videos.map((v: any) => v.id))
    : [];

  const progressMap = new Map(progressRows.map((p: any) => [p.video_id, p]));
  const allVideoIds = videos.map((v: any) => v.id);

  return sections.map((section: any) => ({
    id: section.id,
    title: section.title,
    order_index: section.order_index,
    videos: videos
      .filter((v: any) => v.section_id === section.id)
      .map((v: any) => {
        const progress = progressMap.get(v.id);
        const seqIdx = allVideoIds.indexOf(v.id);
        const prereqId = seqIdx > 0 ? allVideoIds[seqIdx - 1] : null;
        const prereqProgress = prereqId ? progressMap.get(prereqId) : null;
        const locked = prereqId !== null && !prereqProgress?.is_completed;

        return {
          id: v.id,
          title: v.title,
          order_index: v.order_index,
          duration_seconds: v.duration_seconds,
          is_completed: progress?.is_completed ?? false,
          locked,
        };
      }),
  }));
};
