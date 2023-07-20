import express, { Request, Response, NextFunction } from 'express';
import { BlogModel } from './models/blog';
import { blogRouter } from './routes/blogs';

export const app = express();

// on the dedicated path, return the response
app.use('/api/blogs', blogRouter);

// on the other paths, return 404
app.use((req, res, next) => {
  next(Error('Endpoint not found'));
});

// error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMsg = 'Internal server error';
  if (error instanceof Error) {
    errorMsg = error.message;
  }
  res.status(500).json({ error: errorMsg });
});
