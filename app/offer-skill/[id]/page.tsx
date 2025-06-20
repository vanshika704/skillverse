'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

const LivePage = () => {
  const router = useRouter();

  const deployedUrl = 'https://callora.vercel.app/';

  useEffect(() => {
    // Redirect the user as soon as they visit this page
    window.location.href = deployedUrl;
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center">
      <p className="text-cyan-700">Redirecting you to the video call...</p>
    </div>
  );
};

export default LivePage;
