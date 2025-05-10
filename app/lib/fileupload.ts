import { NextResponse } from 'next/server';
import Course from '../models/Workshop';
import { connectToDB } from '../config/db';
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
    
    const filter: Record<string, unknown> = {};
    const creator = searchParams.get('creator');
    const isPaid = searchParams.get('isPaid');
    
    if (creator) filter.creator = creator;
    if (isPaid) filter.isPaid = isPaid === 'true';
    
    const courses = await Course.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// POST new course
export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('multipart/form-data')) {
      return NextResponse.json(
        { success: false, message: 'Content-Type must be multipart/form-data' },
        { status: 400 }
      );
    }

    await connectToDB();
    const formData = await request.formData();

    // File upload handling
    const file = formData.get('coverImage') as File | null;
    let fileUrl = '';
    
    if (file && file.size > 0) {
      // Validate file
      const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB
      
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { success: false, message: 'Only JPEG, PNG, and WebP images are allowed' },
          { status: 400 }
        );
      }
      
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { success: false, message: 'Image must be smaller than 5MB' },
          { status: 400 }
        );
      }

      // Process upload
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      try {
        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);
        fileUrl = `/uploads/${filename}`;
      } catch (error) {
        console.error('File upload error:', error);
        return NextResponse.json(
          { success: false, message: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    // Helper to get required fields
    const getRequiredField = (fieldName: string): string => {
      const value = formData.get(fieldName)?.toString();
      if (!value) throw new Error(`Missing required field: ${fieldName}`);
      return value;
    };

    // Build course data
    const courseData: CourseData = {
      title: getRequiredField('title'),
      description: getRequiredField('description'),
      creator: getRequiredField('creator'),
      date: getRequiredField('date'),
      time: getRequiredField('time'),
      url: getRequiredField('url'),
      coverImage: fileUrl,
      topics: formData.get('topics')?.toString().split(',').map(t => t.trim()) || [],
      isPaid: formData.get('isPaid') === 'true',
      amount: formData.get('isPaid') === 'true'
  ? parseFloat(formData.get('amount')?.toString() || '0')
  : 0

    };

    const course = await Course.create(courseData);
    return NextResponse.json(
      { success: true, data: course },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to create course',
        ...(error.errors && { errors: error.errors })
      },
      { status: error.message?.includes('Missing') ? 400 : 500 }
    );
  }
}

// PUT update course
export async function PUT(request: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Course ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const course = await Course.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });

    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE course
export async function DELETE(request: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Course ID is required' },
        { status: 400 }
      );
    }

    const result = await Course.deleteOne({ _id: id });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}