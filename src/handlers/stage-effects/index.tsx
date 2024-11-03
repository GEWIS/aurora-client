import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { EventEmitter } from 'events';
import StainedGlass from './components/backgrounds/StainedGlass';
import BeatLogo from './components/BeatLogo';

interface Props {
  socket: Socket;
}

export default function StageEffectsView({ socket }: Props) {
  const [eventEmitter] = useState(new EventEmitter());

  const handleBeat = () => {
    eventEmitter.emit('beat');
  };

  useEffect(() => {
    socket.on('beat', handleBeat);

    return () => {
      socket.removeListener('beat', handleBeat);
    };
  }, []);

  return (
    <>
      <div className="h-screen w-screen">
        <StainedGlass />
        <BeatLogo eventEmitter={eventEmitter} logo="borrel/bac.svg" />
      </div>
    </>
  );
}
