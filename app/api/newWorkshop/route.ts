

import { connectToDB } from '@/app/config/db';
import { Live } from '@/app/models/Live';
import { getUserFromToken } from '@/app/config/getUserfromToken';
import { generateRoomName } from '@/app/utils/generateroom';
import { v4 as uuidv4 } from 'uuid';
export async function GET(request: Request) {
  await connectToDB();
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });
    }

    const url = new URL(request.url);
    const mode = url.searchParams.get('mode');
    const status = url.searchParams.get('status');

    const filters: any = { organizer: user.id };
    if (mode) filters.mode = mode;
    if (status) filters.status = status;

    const lives = await Live.find(filters).sort({ startTime: 1 });

    return new Response(JSON.stringify({ success: true, data: lives }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Error fetching live sessions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// export async function POST(request: Request) {
//   await connectToDB();
//   try {
//     const user = await getUserFromToken(request);
//     if (!user) {
//       return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });
//     }

//     const body = await request.json();

//     const {
//       title,
//       description,
//       startTime,
//       endTime,
//       mode,
//       address,
//       maxParticipants,
//       status,
//     } = body;

//     if (!title || !description || !startTime || !endTime || !mode || !maxParticipants || !status) {
//       return new Response(
//         JSON.stringify({ success: false, message: 'Missing required fields' }),
//         { status: 400, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     const newLive = new Live({
//       ...body,
//       organizer: user.id,
//     });

//     await newLive.save();

//     return new Response(
//       JSON.stringify({ success: true, message: 'Live session created', data: newLive }),
//       { status: 201, headers: { 'Content-Type': 'application/json' } }
//     );
//   } catch (error) {
//     console.error('POST error:', error);
//     return new Response(
//       JSON.stringify({ success: false, message: 'Error creating live session' }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }


export async function POST(request: Request) {
  await connectToDB();
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      startTime,
      endTime,
      mode,
      address,
      maxParticipants,
      status,
      isPaid,
      price, // may be undefined if unpaid
    } = body;

    // Validate required fields
    if (!title || !description || !startTime || !endTime || !mode || !maxParticipants || !status || isPaid === undefined) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const id = uuidv4();
    const meetingRoomId = generateRoomName(title,id);

    const newLive = new Live({
      _id: id,
      User: user.id,
      title,
      description,
      startTime,
      endTime,
      mode,
      address,
      maxParticipants,
      status,
      organizer: user.id,
      isLive: false,
      meetingPlatform: 'jitsi',
      meetingRoomId,
      isPaid,
      price: isPaid ? price : 0,
    });

    await newLive.save();

    return new Response(
      JSON.stringify({ success: true, message: 'Live session created', data: newLive }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('POST error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error creating live session' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
export async function DELETE(request: Request) {
  await connectToDB();
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing or invalid ID' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const live = await Live.findOne({ _id: id });
    if (!live) {
      return new Response(
        JSON.stringify({ success: false, message: 'Live session not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (live.organizer.toString() !== user.id) {
      return new Response(
        JSON.stringify({ success: false, message: 'Unauthorized to delete this session' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await Live.deleteOne({ _id: id });

    return new Response(
      JSON.stringify({ success: true, message: 'Live session deleted' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error deleting live session' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT(request: Request) {
  await connectToDB();
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: 'ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const live = await Live.findOne({ _id: id });
    if (!live) {
      return new Response(
        JSON.stringify({ success: false, message: 'Live session not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (live.organizer.toString() !== user.id) {
      return new Response(
        JSON.stringify({ success: false, message: 'Unauthorized to update this session' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const updatedLive = await Live.findOneAndUpdate(
      { _id: id },
      { ...body, organizer: user.id },
      { new: true, runValidators: true }
    );

    return new Response(
      JSON.stringify({ success: true, data: updatedLive }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('PUT error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error updating live session' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}