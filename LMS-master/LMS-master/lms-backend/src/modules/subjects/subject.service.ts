import { AppError } from '../../middleware/errorHandler';
import * as repo from './subject.repository';

export const listSubjects = async (page = 1, pageSize = 12, q?: string, category?: string) => {
  return repo.findAllPublished(page, pageSize, q, category);
};

export const getSubject = async (id: number) => {
  const subject = await repo.findById(id);
  if (!subject) throw new AppError(404, 'Subject not found', 'NotFound');
  return subject;
};

export const listSubjectVideos = async (subjectId: number) => {
  return repo.findAllVideosBySubject(subjectId);
};

export const getSubjectTree = async (subjectId: number, userId: number) => {
  const subject = await repo.findById(subjectId);
  if (!subject) throw new AppError(404, 'Subject not found', 'NotFound');
  const sections = await repo.findTreeWithProgress(subjectId, userId);
  return { id: subject.id, title: subject.title, description: subject.description, sections };
};
