import mongoose, { Schema, Document } from 'mongoose';

export interface IStaff extends Document {
  name: string;
  role: string;
  bio: string;
  image: string;
  experience: number;
  department: string;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const StaffSchema = new Schema<IStaff>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    experience: { type: Number, default: 0 },
    department: { type: String, required: true },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Staff = mongoose.models.Staff || mongoose.model<IStaff>('Staff', StaffSchema);
