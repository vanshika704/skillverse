'use client';
import { JitsiMeeting } from '@jitsi/react-sdk';
import React from 'react';

type JitsiMeetProps = {
  roomName: string;
};

const JitsiMeet: React.FC<JitsiMeetProps> = ({ roomName }) => {
  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <JitsiMeeting
        roomName={roomName}
        configOverwrite={{
          startWithAudioMuted: false,
          disableModeratorIndicator: false,
        }}
        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
        }}
        userInfo={{
          displayName: 'Host',
          email: 'sharmavanshi704@gmail.com', // ✅ Required field
        }}
        getIFrameRef={(node) => {
          node?.style.setProperty('height', '100%');
          node?.style.setProperty('width', '100%');
        }}
      />
    </div>
  );
};

export default JitsiMeet;
