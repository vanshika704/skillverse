import mongoose, { Document, Schema } from 'mongoose';

export type WorkshopStatus = 'draft' | 'upcoming';

export interface ILive extends Document {
  title: string;
  description: string;
  start: Date;
  end: Date;
  location: 'Online' | 'In-Person' | 'Hybrid';
  maxParticipants: number;
  registered: number;
  status: WorkshopStatus;
}

const LiveSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  location: {
    type: String,
    enum: ['Online', 'In-Person', 'Hybrid'],
    required: true,
    default: 'Online'
  },
  maxParticipants: { type: Number, required: true, min: 1 },
  registered: { type: Number, required: true, default: 0, min: 0 },
  status: {
    type: String,
    enum: ['draft', 'upcoming'],
    required: true,
    default: 'draft'
  },
}, {
  timestamps: true,
});

export default mongoose.models.Live || mongoose.model<ILive>('Live', LiveSchema);
