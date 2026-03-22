import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.code || 'Error',
      message: err.message,
    });
    return;
  }

  console.error('[Unhandled Error]', err);
  res.status(500).json({
    error: 'InternalServerError',
    message: 'Something went wrong',
  });
};
