import express from 'express';
import { getAllBlogsController } from '../controllers/blogs';

export const blogRouter = express.Router();

blogRouter.get('/', getAllBlogsController);
