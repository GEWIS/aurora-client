import './index.scss';
import { EventEmitter } from 'events';
import { useEffect, useState } from 'react';
import { HandlerComponent } from '@gewis/aurora-client-util';
import { StainedGlass } from '@gewis/aurora-client-theme';
import Logo from '../assets/bac.svg?react';
import BeatLogo from './components/BeatLogo';

export const StageEffectsView: HandlerComponent = ({ socket }) => {
  const [eventEmitter] = useState(new EventEmitter());

  useEffect(() => {
    const handleBeat = () => {
      eventEmitter.emit('beat');
    };

    socket.on('beat', handleBeat);

    return () => {
      socket.removeListener('beat', handleBeat);
    };
  }, [eventEmitter, socket]);

  return (
    <>
      <div className="h-screen w-screen">
        <StainedGlass />
        <BeatLogo eventEmitter={eventEmitter} Logo={Logo} />
      </div>
    </>
  );
};
