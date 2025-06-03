'use client';

import { useEffect, useRef } from 'react';

type Props = {
  roomName: string;
};

const JitsiMeet = ({ roomName }: Props) => {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !roomName) return;

    const domain = 'meet.jit.si';
    const options = {
      roomName,
      parentNode: jitsiContainerRef.current,
      width: '100%',
      height: 600,
      configOverwrite: {},
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_CHROME_EXTENSION_BANNER: false,
        DEFAULT_REMOTE_DISPLAY_NAME: 'Guest',
        TOOLBAR_BUTTONS: ['microphone', 'camera', 'hangup', 'chat'],
      },
    };

    const api = new (window as any).JitsiMeetExternalAPI(domain, options);

    return () => api?.dispose?.();
  }, [roomName]);

  return <div ref={jitsiContainerRef} className="rounded-xl overflow-hidden shadow-lg" />;
};

export default JitsiMeet;
