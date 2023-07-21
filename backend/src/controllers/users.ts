import { RequestHandler } from 'express';
import { UserModel } from '../models/users';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

interface SignUpBody {
  username?: string;
  email?: string;
  rawPassword?: string;
}

interface SignInBody {
  username?: string;
  rawPassword?: string;
}

// get authenticated user
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, 'Unauthorized: Please sign in first');
    }

    const user = await UserModel.findById(authenticatedUserId)
      .select('+email')
      .exec();

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const { username, email, rawPassword } = req.body;

  try {
    if (!username) {
      throw createHttpError(400, 'Username is required');
    }
    if (!email) {
      throw createHttpError(400, 'Email is required');
    }
    if (!rawPassword) {
      throw createHttpError(400, 'Password is required');
    }

    const existingUsername = await UserModel.findOne({ username }).exec();

    if (existingUsername) {
      throw createHttpError(
        409,
        'Username already exists, please create another one'
      );
    }

    const existingEmail = await UserModel.findOne({ email }).exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        'Email already exists, please create another one'
      );
    }

    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // store the user id in the session
    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const signIn: RequestHandler<
  unknown,
  unknown,
  SignInBody,
  unknown
> = async (req, res, next) => {
  const { username, rawPassword } = req.body;

  try {
    if (!username) {
      throw createHttpError(400, 'Username is required');
    }
    if (!rawPassword) {
      throw createHttpError(400, 'Password is required');
    }

    const user = await UserModel.findOne({ username })
      .select('+password +email') // explicitly select password and email
      .exec();

    if (!user) {
      throw createHttpError(
        401,
        'Username or password is incorrect, Invalid credentials'
      );
    }

    const isPasswordCorrect = await bcrypt.compare(rawPassword, user.password);

    if (!isPasswordCorrect) {
      throw createHttpError(401, 'password not match, Invalid credentials');
    }

    // store the user id in the session
    req.session.userId = user._id;

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const signOut: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res
        .clearCookie('connect.sid')
        .status(200)
        .json({ message: 'session delete success' });
    }
  });
};
