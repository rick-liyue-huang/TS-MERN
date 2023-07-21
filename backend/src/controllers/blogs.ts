import { Request, Response, NextFunction, RequestHandler } from 'express';
import mongoose from 'mongoose';
import { BlogModel } from '../models/blog';
import createHttpError from 'http-errors';

interface CreateBlogBody {
  title?: string;
  text?: string;
}

interface UpdateBlogBody {
  title?: string;
  text?: string;
}

interface UpdateBlogParams {
  blogId: string;
}

interface DeleteBlogParams {
  blogId: string;
}

export const getAllBlogsController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // throw createHttpError(401);
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
    if (!mongoose.isValidObjectId(blogId)) {
      throw createHttpError(400, 'Blog id is required');
    }
    const blog = await BlogModel.findById(blogId).exec();
    if (!blog) {
      throw createHttpError(404, 'Blog not found');
    }
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

export const createNewBlogController: RequestHandler<
  unknown,
  unknown,
  CreateBlogBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;

  try {
    if (!title) {
      throw createHttpError(400, 'Title is required');
    }
    const newBlog = await BlogModel.create({ title, text });
    res.status(201).json(newBlog);
  } catch (err) {
    // todo: handle error
    next(err);
  }
};

export const updateBlogController: RequestHandler<
  UpdateBlogParams,
  unknown,
  UpdateBlogBody,
  unknown
> = async (req, res, next) => {
  const { blogId } = req.params;
  const { title, text } = req.body;

  try {
    if (!mongoose.isValidObjectId(blogId)) {
      throw createHttpError(400, 'Blog id is required');
    }
    const findBlog = await BlogModel.findById(blogId).exec();

    if (!findBlog) {
      throw createHttpError(404, 'Blog not found');
    }

    if (!title) {
      throw createHttpError(400, 'Title is required');
    }
    // const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, {
    //   title,
    //   text,
    // });
    findBlog.title = title;
    findBlog.text = text;
    const updatedBlog = await findBlog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
};

export const deleteBlogController: RequestHandler<
  DeleteBlogParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { blogId } = req.params;

  try {
    if (!mongoose.isValidObjectId(blogId)) {
      throw createHttpError(400, 'Blog id is required');
    }
    const blog = await BlogModel.findById(blogId).exec();
    if (!blog) {
      throw createHttpError(404, 'Blog not found');
    }
    await blog.deleteOne();

    res.sendStatus(204).end();
  } catch (err) {
    next(err);
  }
};
