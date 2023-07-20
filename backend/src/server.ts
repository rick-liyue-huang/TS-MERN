import 'dotenv/config'; // store the local environment variables in the process.env object
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { validateEnv } from './utils/validate-env';

const app = express();

const PORT = validateEnv.PORT || 4000;
const MONGO_CONNECTION_URL_STRING = validateEnv.MONGO_CONNECTION_URL_STRING;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// connect the database firstly
mongoose
  .connect(MONGO_CONNECTION_URL_STRING)
  .then(() => {
    console.log('Connected to the database!');

    // then start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
