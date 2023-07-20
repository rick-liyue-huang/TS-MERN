import { Request, Response, NextFunction, RequestHandler } from 'express';
import { BlogModel } from '../models/blog';

export const getAllBlogsController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // throw new Error('Oops!');
    const blogs = await BlogModel.find().exec();
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};
