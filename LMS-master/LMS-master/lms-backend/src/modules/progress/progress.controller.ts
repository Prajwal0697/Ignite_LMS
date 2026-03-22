import { Request, Response, NextFunction } from 'express';
import * as service from './progress.service';

export const getSubjectProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await service.getSubjectProgress(req.user!.sub, parseInt(req.params.subjectId)));
  } catch (err) { next(err); }
};

export const getVideoProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await service.getVideoProgress(req.user!.sub, parseInt(req.params.videoId)));
  } catch (err) { next(err); }
};

export const upsertVideoProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { last_position_seconds = 0, is_completed = false } = req.body;
    res.json(await service.upsertVideoProgress(
      req.user!.sub,
      parseInt(req.params.videoId),
      Number(last_position_seconds),
      Boolean(is_completed)
    ));
  } catch (err) { next(err); }
};
