import express from 'express';

import {
  getAuthenticatedUser,
  signIn,
  signOut,
  signUp,
} from '../controllers/users';

export const userRouter = express.Router();

userRouter
  .get('/', getAuthenticatedUser)
  .post('/sign-up', signUp)
  .post('/sign-in', signIn)
  .post('/sign-out', signOut);
