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
    organizer: { type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,},
    isLive: { type: Boolean, default: false },
    meetingPlatform: { type: String, enum: ['jitsi'], default: 'jitsi' },
    meetingRoomId: { type: String },
    isPaid: { type: Boolean, required: true },
    price: {type: Number,required: function (this: any): boolean { return this.isPaid;},min: 0,}
},
  { timestamps: true, _id: false }
);

export const Live = mongoose.models.Live || mongoose.model("Live", LiveSchema);
