import { NextResponse } from 'next/server';
import Course from '../../models/Workshop';
import { connectToDB } from '@/app/config/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

interface CourseData {
  title: string;
  description: string;
  creator: string;
  date: string;
  time: string;
  url: string;
  coverImage?: string;
  topics: string[];
  isPaid: boolean;
  amount: number;
}

// GET all courses
export async function GET(request: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);

    const filter: Record<string, any> = {};
    if (searchParams.get('creator')) filter.creator = searchParams.get('creator');
    if (searchParams.get('isPaid')) filter.isPaid = searchParams.get('isPaid') === 'true';

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// POST new course
export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('multipart/form-data')) {
      return NextResponse.json({ success: false, message: 'Invalid content type' }, { status: 400 });
    }

    await connectToDB();
    const formData = await request.formData();

    // File handling
    const file = formData.get('coverImage') as File | null;
    let fileUrl = '';

    if (file && file.size > 0) {
      const allowed = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowed.includes(file.type)) {
        return NextResponse.json({ success: false, message: 'Invalid image type' }, { status: 400 });
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        return NextResponse.json({ success: false, message: 'Image too large' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), buffer);
      fileUrl = `/uploads/${filename}`;
    }

    // Construct course
    const getField = (key: string) => {
      const val = formData.get(key)?.toString();
      if (!val) throw new Error(`Missing required field: ${key}`);
      return val;
    };

    const courseData: CourseData = {
      title: getField('title'),
      description: getField('description'),
      creator: getField('creator'),
      date: getField('date'),
      time: getField('time'),
      url: getField('url'),
      coverImage: fileUrl,
      topics: formData.get('topics')?.toString().split(',').map(t => t.trim()) || [],
      isPaid: formData.get('isPaid') === 'true',
      amount: formData.get('isPaid') === 'true' ? parseFloat(formData.get('amount')?.toString() || '0') : 0,
    };

    const course = await Course.create(courseData);
    return NextResponse.json({ success: true, data: course }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Creation failed', ...(error.errors && { errors: error.errors }) },
      { status: error.message?.includes('Missing') ? 400 : 500 }
    );
  }
}

// PUT update course by ?id=
export async function PUT(request: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });

    const body = await request.json();
    const updated = await Course.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!updated) return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: updated });

  } catch (error) {
    return NextResponse.json({ success: false, message: 'Update failed' }, { status: 500 });
  }
}

// DELETE course by ?id=
export async function DELETE(request: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });

    const deleted = await Course.deleteOne({ _id: id });

    if (deleted.deletedCount === 0) {
      return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });

  } catch (error) {
    return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
  }
}
