import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  position: string;
  bio: string;
  image: string;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    position: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);
