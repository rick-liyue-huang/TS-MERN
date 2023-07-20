import express from 'express';
import {
  createNewBlogController,
  deleteBlogController,
  getAllBlogsController,
  getSingleBlogController,
  updateBlogController,
} from '../controllers/blogs';

export const blogRouter = express.Router();

blogRouter
  .get('/', getAllBlogsController)
  .get('/:blogId', getSingleBlogController)
  .post('/', createNewBlogController)
  .patch('/:blogId', updateBlogController)
  .delete('/:blogId', deleteBlogController);
