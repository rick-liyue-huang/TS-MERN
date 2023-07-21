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
  .post('/signup', signUp)
  .post('/signin', signIn)
  .post('/signout', signOut);
