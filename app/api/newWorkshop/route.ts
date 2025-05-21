// import { connectToDB } from '@/app/config/db';
// import { Live } from '@/app/models/Live'; // import live model 
// /////////////////////////////////////////////////////////////

// // this route is to get all live data from the database
// export async function GET(request: Request) {
//   await connectToDB();
//   try {
//     const url = new URL(request.url);
//     const mode = url.searchParams.get('mode');
//     const status = url.searchParams.get('status');

//     const filters: any = {};
//     if (mode) filters.mode = mode;
//     if (status) filters.status = status;

//     const lives = await Live.find(filters).sort({ startTime: 1 });

//     return new Response(
//       JSON.stringify({ success: true, data: lives }),
//       { status: 200, headers: { 'Content-Type': 'application/json' } }
//     );
//   } catch (error) {
//     console.error('GET error:', error);
//     return new Response(
//       JSON.stringify({ success: false, message: 'Error fetching live sessions' }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }
// ///////////////////////////////////////////////////////////////////////////

// export async function POST(request: Request) {
//   await connectToDB();
//   try {
//     const body = await request.json();

//     const {
//       User,
//       title,
//       description,
//       startTime,
//       endTime,
//       mode,
//       address,
//       maxParticipants,
//       status,
//     } = body;

//     if (
//       !title ||
//       !User||
//       !description ||
//       !startTime ||
//       !endTime ||
//       !mode ||
//       !maxParticipants ||
//       !status
//     ) {
//       return new Response(
//         JSON.stringify({ success: false, message: 'Missing required fields' }),
//         { status: 400, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     const newLive = new Live({
//       User,
//       title,
//       description,
//       startTime,
//       endTime,
//       mode,
//       address,
//       maxParticipants,
//       status,
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




// export async function DELETE(request: Request) {
//   await connectToDB();

//   try {
//     const url = new URL(request.url);
//     const id = url.searchParams.get('id');

//     console.log('DELETE request with id:', id);

//     if (!id) {
//       return new Response(
//         JSON.stringify({ success: false, message: 'Missing or invalid ID' }),
//         { status: 400, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     // Use findOneAndDelete for UUIDs (string _id)
//     const deleted = await Live.findOneAndDelete({ _id: id });

//     if (!deleted) {
//       return new Response(
//         JSON.stringify({ success: false, message: 'Live session not found' }),
//         { status: 404, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     return new Response(
//       JSON.stringify({ success: true, message: 'Live session deleted' }),
//       { status: 200, headers: { 'Content-Type': 'application/json' } }
//     );
//   } catch (error) {
//     console.error('DELETE error:', error);
//     return new Response(
//       JSON.stringify({ success: false, message: 'Error deleting live session' }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }

// export async function PUT(request: Request) {
//   await connectToDB();

//   try {
//     const url = new URL(request.url);
//     const id = url.searchParams.get('id');

//     if (!id) {
//       return new Response(
//         JSON.stringify({ success: false, message: 'ID is required' }),
//         { status: 400, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     const body = await request.json();

//     const updatedWorkshop = await Live.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true });


//     if (!updatedWorkshop) {
//       return new Response(
//         JSON.stringify({ success: false, message: 'Workshop not found' }),
//         { status: 404, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     return new Response(
//       JSON.stringify({ success: true, data: updatedWorkshop }),
//       { status: 200, headers: { 'Content-Type': 'application/json' } }
//     );
//   } catch (error) {
//     console.error('PUT error:', error);
//     return new Response(
//       JSON.stringify({ success: false, message: 'Error updating workshop' }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }


import { connectToDB } from '@/app/config/db';
import { Live } from '@/app/models/Live';

export async function GET(request: Request) {
  await connectToDB();
  try {
    const url = new URL(request.url);
    const mode = url.searchParams.get('mode');
    const status = url.searchParams.get('status');

    const filters: any = {};
    if (mode) filters.mode = mode;
    if (status) filters.status = status;

    const lives = await Live.find(filters).sort({ startTime: 1 });

    return new Response(
      JSON.stringify({ success: true, data: lives }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('GET error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error fetching live sessions' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request: Request) {
  await connectToDB();
  try {
    const body = await request.json();

    const {
      _id,
      User,
      title,
      description,
      startTime,
      endTime,
      mode,
      address,
      maxParticipants,
      status,
    } = body;

    if (
      !_id ||
      !title ||
      !User ||
      !description ||
      !startTime ||
      !endTime ||
      !mode ||
      !maxParticipants ||
      !status
    ) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create new Live session with provided UUID _id
    const newLive = new Live({
      _id,
      User,
      title,
      description,
      startTime,
      endTime,
      mode,
      address,
      maxParticipants,
      status,
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
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing or invalid ID' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const deleted = await Live.findOneAndDelete({ _id: id });

    if (!deleted) {
      return new Response(
        JSON.stringify({ success: false, message: 'Live session not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

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
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: 'ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();

    const updatedLive = await Live.findOneAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedLive) {
      return new Response(
        JSON.stringify({ success: false, message: 'Live session not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

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
