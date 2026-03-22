import { Request, Response, NextFunction } from 'express';
import * as service from './subject.service';

export const listSubjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 12;
    const q = req.query.q as string | undefined;
    const category = req.query.category as string | undefined;
    res.json(await service.listSubjects(page, pageSize, q, category));
  } catch (err) { next(err); }
};

export const getSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await service.getSubject(parseInt(req.params.subjectId)));
  } catch (err) { next(err); }
};

export const getSubjectVideos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await service.listSubjectVideos(parseInt(req.params.subjectId)));
  } catch (err) { next(err); }
};

export const getSubjectTree = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.sub;
    res.json(await service.getSubjectTree(parseInt(req.params.subjectId), userId));
  } catch (err) { next(err); }
};
