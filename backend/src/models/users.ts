import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // username must be unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // email must be unique
    select: false, // don't return email in response
  },
  password: {
    type: String,
    required: true,
    select: false, // don't return password in response
  },
});

type UserSchemaType = InferSchemaType<typeof userSchema>;

export const UserModel = model<UserSchemaType>('User', userSchema);
