import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const newSocket = io('https://emergency-response-system-cbr2.onrender.com');
    setSocket(newSocket);

    newSocket.on('receiveAlert', (data) => {
      setAlert(data);
    });

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, alert }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
