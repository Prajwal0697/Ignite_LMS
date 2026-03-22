import { Request, Response, NextFunction } from 'express';
import * as service from './health.service';

export const checkHealth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.checkHealth();
    if (result.status === 'error') {
      res.status(503).json(result);
    } else {
      res.json(result);
    }
  } catch (err) { next(err); }
};
