import { Request, Response, NextFunction } from 'express';
import * as service from './youtube.service';

export const getVideos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'BadRequest', message: 'Query parameter "q" is required' });
    }

    const videos = await service.searchVideos(q as string);
    res.json({ videos });
  } catch (err: any) {
    next(err);
  }
};
