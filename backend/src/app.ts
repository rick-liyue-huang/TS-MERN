import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';
import { blogRouter } from './routes/blogs';
import { userRouter } from './routes/users';
import session from 'express-session';
import { validateEnv } from './utils/validate-env';
import MongoStore from 'connect-mongo';

const whitelist = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export const app = express();

app.use(cors(corsOptions));

//
app.use(morgan('dev'));

// parse the request body
app.use(express.json());

// use session
app.use(
  session({
    secret: validateEnv.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 8, // 8 hours
    },
    rolling: true, // reset maxAge on every request
    // store: new session.MemoryStore(), // use MemoryStore in development
    store: MongoStore.create({
      mongoUrl: validateEnv.MONGO_CONNECTION_URL_STRING,
    }),
  })
);

// on the dedicated path, return the response
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

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

  res.status(statusCode).json({ error: errorMsg }); // match with api_blogs in frontend
});
