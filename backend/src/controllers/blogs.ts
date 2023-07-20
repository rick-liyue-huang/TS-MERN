import { Request, Response, NextFunction, RequestHandler } from 'express';
import mongoose from 'mongoose';
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

export const getSingleBlogController: RequestHandler = async (
  req,
  res,
  next
) => {
  const { blogId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      throw new Error('Blog id is required');
    }
    const blog = await BlogModel.findById(blogId).exec();
    if (!blog) {
      throw new Error('Blog not found');
    }
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

export const createNewBlogController: RequestHandler = async (
  req,
  res,
  next
) => {
  const { title, text } = req.body;

  try {
    if (!title) {
      throw new Error('Title is required');
    }
    const newBlog = await BlogModel.create({ title, text });
    res.status(201).json(newBlog);
  } catch (err) {
    // todo: handle error
    next(err);
  }
};
