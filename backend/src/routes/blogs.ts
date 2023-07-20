import express from 'express';
import {
  createNewBlogController,
  getAllBlogsController,
  getSingleBlogController,
} from '../controllers/blogs';

export const blogRouter = express.Router();

blogRouter
  .get('/', getAllBlogsController)
  .get('/:blogId', getSingleBlogController)
  .post('/', createNewBlogController);
