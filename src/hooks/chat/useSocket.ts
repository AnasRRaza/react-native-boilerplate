import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

import { Config } from '@/config/app.config';

/**
 * Custom hook to manage socket connection for real-time chat
 * When APIs are ready, this will connect to the actual socket server
 */
export function useSocket(userId: string) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (userId) {
      // For now, we'll create a mock socket connection
      // Replace with actual socket connection when API is ready
      socketRef.current = io(Config.API_BASE_URL, {
        query: { userId },
        autoConnect: false, // Don't auto-connect in mock mode
      });

      // Mock socket events - uncomment when connecting to real server
      // socketRef.current.connect();
      // socketRef.current.on('connect', () => {
      //   console.warn('Connected to socket server:', socketRef.current?.id);
      // });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off('connect');
      socketRef.current?.off('disconnect');
      socketRef.current?.off('receive_private_message');
    };
  }, [userId]);

  return socketRef.current;
}
