import { db } from '../config/db';

export interface VideoInSequence {
  id: number;
  section_id: number;
  order_index: number;
  section_order_index: number;
}

/**
 * Returns ordered list of all video IDs for a subject (global sequence).
 */
export const getGlobalVideoSequence = async (subjectId: number): Promise<number[]> => {
  const rows = await db('videos as v')
    .join('sections as s', 'v.section_id', 's.id')
    .where('s.subject_id', subjectId)
    .orderBy(['s.order_index', 'v.order_index'])
    .select('v.id');
  return rows.map((r: any) => r.id);
};

/**
 * Returns prerequisite_video_id for a given video in a subject.
 * NULL if it's the first video in the subject.
 */
export const getPrerequisiteVideoId = async (
  videoId: number,
  subjectId: number
): Promise<number | null> => {
  const sequence = await getGlobalVideoSequence(subjectId);
  const idx = sequence.indexOf(videoId);
  if (idx <= 0) return null;
  return sequence[idx - 1];
};

/**
 * Returns next video ID after a given video in a subject. NULL if last.
 */
export const getNextVideoId = async (
  videoId: number,
  subjectId: number
): Promise<number | null> => {
  const sequence = await getGlobalVideoSequence(subjectId);
  const idx = sequence.indexOf(videoId);
  if (idx < 0 || idx === sequence.length - 1) return null;
  return sequence[idx + 1];
};
