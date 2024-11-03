import { Socket, io } from 'socket.io-client';

export default function registerScreenHandler(
  setScreenSocket: (value: ((prevState: Socket) => Socket) | Socket) => void,
) {
  const screenSocket = io('/screen', {
    path: '/socket.io/',
  });

  screenSocket.on('connect', () => {
    console.warn('SocketIO: connected to /screen');
    setScreenSocket(screenSocket);
  });
}
