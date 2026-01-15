import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  credentials: string;
  bio: string;
  image: string;
  specializations: string[];
  experience: number;
  education: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true, trim: true },
    credentials: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    specializations: [{ type: String }],
    experience: { type: Number, default: 0 },
    education: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Doctor = mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);
