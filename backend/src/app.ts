import express, { Request, Response } from 'express';
import { BlogModel } from './models/blog';

export const app = express();

app.get('/', async (req: Request, res: Response) => {
  const blogs = await BlogModel.find().exec();
  res.status(200).json(blogs);
});
