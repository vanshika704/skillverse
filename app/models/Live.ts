

import mongoose from "mongoose";

const LiveSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    User: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    mode: { type: String, required: true },
    address: { type: String },
    maxParticipants: { type: Number, required: true },
    status: { type: String, required: true },
    organizer: {type: mongoose.Schema.Types.ObjectId,ref: "User", required: true,},

  },
  { timestamps: true, _id: false }
);

export const Live = mongoose.models.Live || mongoose.model("Live", LiveSchema);
