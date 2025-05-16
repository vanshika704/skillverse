import mongoose from "mongoose";

const LiveSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  mode: { type: String, required: true },
  address: { type: String },
  maxParticipants: { type: Number, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

export const Live = mongoose.models.Live || mongoose.model('Live', LiveSchema);
