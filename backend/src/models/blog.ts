import { Schema, InferSchemaType, model } from 'mongoose';

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

type BlogSchemaType = InferSchemaType<typeof blogSchema>;

export const BlogModel = model<BlogSchemaType>('Blog', blogSchema);
