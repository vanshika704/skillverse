'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import JitsiMeet from '../Jitsi';

const LivePage = () => {
  const params = useParams();
  const roomId = params?.id as string;

  return (
    <div>
      <JitsiMeet roomName={roomId} />
    </div>
  );
};

export default LivePage;
