import mongoose from 'mongoose';


interface ICourse extends mongoose.Document {
  title: string;
  description: string;
  date: string;
  time: string;
  isPaid: boolean;
  amount: number;
  url: string;
  topics: string[];
  creator: string;
  enrolledUsers: string[];
  coverImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new mongoose.Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
    amount: { type: Number, default: 0 },
    url: { type: String, required: true },
    topics: { type: [String], required: true },
    creator: { type: String, required: true },
    enrolledUsers: { type: [String], default: [] },
    coverImage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models?.Course || mongoose.model<ICourse>('Course', CourseSchema);