import { NextRequest, NextResponse } from 'next/server';
import Live from '../../models/newlive';
import { connectToDB } from '@/app/config/db';

const normalizeWorkshop = (doc: any) => {
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

export async function handler(req: NextRequest) {
  await connectToDB();
  const { method } = req;
  const url = new URL(req.url);
  const pathname = url.pathname;
  const idMatch = pathname.match(/\/api\/workshops\/([a-zA-Z0-9]+)/);
  const id = idMatch ? idMatch[1] : null;

  try {
    if (method === 'GET' && !id && !url.searchParams.has('start')) {
      const workshops = await Live.find();
      return NextResponse.json(workshops.map(normalizeWorkshop));
    }

    if (method === 'GET' && id) {
      const workshop = await Live.findById(id);
      if (!workshop) return NextResponse.json({ message: 'Workshop not found' }, { status: 404 });
      return NextResponse.json(normalizeWorkshop(workshop));
    }

    if (method === 'GET' && url.searchParams.has('start') && url.searchParams.has('end')) {
      const start = url.searchParams.get('start');
      const end = url.searchParams.get('end');
      const workshops = await Live.find({
        start: { $gte: new Date(start!) },
        end: { $lte: new Date(end!) },
      });
      return NextResponse.json(workshops.map(normalizeWorkshop));
    }

    if (method === 'POST') {
      const body = await req.json();
      const workshop = new Live(body);
      await workshop.save();
      return NextResponse.json(normalizeWorkshop(workshop), { status: 201 });
    }

    if (method === 'PUT' && id) {
      const body = await req.json();
      const updated = await Live.findByIdAndUpdate(id, body, { new: true });
      if (!updated) return NextResponse.json({ message: 'Workshop not found' }, { status: 404 });
      return NextResponse.json(normalizeWorkshop(updated));
    }

    if (method === 'DELETE' && id) {
      const deleted = await Live.findByIdAndDelete(id);
      if (!deleted) return NextResponse.json({ message: 'Workshop not found' }, { status: 404 });
      return NextResponse.json({ message: 'Workshop deleted successfully' });
    }

    return NextResponse.json({ message: 'Route not found or method not supported' }, { status: 405 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
