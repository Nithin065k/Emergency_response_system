// hooks/useSocket.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://emergency-response-system-cbr2.onrender.com'); // Or your backend server URL

export const useSocket = () => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    socket.on('receiveAlert', (data) => {
      setAlert(data);
    });

    return () => socket.off('receiveAlert');
  }, []);

  return { alert };
};
