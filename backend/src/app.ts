import express, { Request, Response, NextFunction } from 'express';
import { BlogModel } from './models/blog';

export const app = express();

// on the root path, return all the blogs
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // throw new Error('Oops!');
    const blogs = await BlogModel.find().exec();
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
});

// on the other paths, return 404
app.use((req, res, next) => {
  next(Error('Endpoint not found'));
});

// error handling middleware
app.use((error: unknown, req: Request, res: Response) => {
  console.error(error);
  let errorMsg = 'Internal server error';
  if (error instanceof Error) {
    errorMsg = error.message;
  }
  res.status(500).json({ error: errorMsg });
});
