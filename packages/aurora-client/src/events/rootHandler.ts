import { io } from 'socket.io-client';
import { Dispatch, SetStateAction } from 'react';

export default function registerRootHandler(setCurrentHandler: Dispatch<SetStateAction<string | null>>) {
  const rootSocket = io('/', {
    path: '/socket.io/',
  });

  rootSocket.on('connect', () => {
    console.warn('SocketIO: connected to /');
  });

  rootSocket.on('handler_set', (handler: string) => {
    console.warn(`Current handler: ${handler}`);
    setCurrentHandler(handler);
  });

  rootSocket.on('handler_remove', () => {
    setCurrentHandler(null);
  });
}
