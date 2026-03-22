import { Request, Response, NextFunction } from 'express';
import * as service from './video.service';

export const getVideo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await service.getVideo(parseInt(req.params.videoId), req.user!.sub));
  } catch (err) { next(err); }
};

export const getFirstVideo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await service.getFirstVideo(parseInt(req.params.subjectId), req.user!.sub));
  } catch (err) { next(err); }
};
