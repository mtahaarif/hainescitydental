import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  category: string;
  description: string;
  content: string;
  images: string[];
  date: Date;
  slug: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    date: { type: Date, default: Date.now },
    slug: { type: String, unique: true, sparse: true },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const News = mongoose.models.News || mongoose.model<INews>('News', NewsSchema);
