import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';
import { BlogModel } from './models/blog';
import { blogRouter } from './routes/blogs';

export const app = express();

//
app.use(morgan('dev'));

// parse the request body
app.use(express.json());

// on the dedicated path, return the response
app.use('/api/blogs', blogRouter);

// on the other paths, return 404
app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

// error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);
  // console.log(typeof error);
  let errorMsg = 'Something internal went wrong!';
  let statusCode = 500;
  // if (error instanceof Error) {
  //   errorMsg = error.message;
  // }

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMsg = error.message;
  }

  res.status(statusCode).json({ error: errorMsg });
});
