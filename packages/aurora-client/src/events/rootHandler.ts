import { io } from 'socket.io-client';
import { Dispatch, SetStateAction } from 'react';
import { Handlers } from '../HandlerSwitcher';

export default function registerRootHandler(setCurrentHandler: Dispatch<SetStateAction<Handlers | null>>) {
  const rootSocket = io('/', {
    path: '/socket.io/',
  });

  rootSocket.on('connect', () => {
    console.warn('SocketIO: connected to /');
  });

  rootSocket.on('handler_set', (handler: Handlers) => {
    console.warn(`Current handler: ${handler}`);
    setCurrentHandler(handler);
  });

  rootSocket.on('handler_remove', () => {
    setCurrentHandler(null);
  });
}
