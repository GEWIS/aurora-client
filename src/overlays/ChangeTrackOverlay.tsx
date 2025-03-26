import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { AnimatePresence, motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { TrackChangeEvent } from '../api';

const TIME_VISIBLE_MS = 8000;

interface Props {
  socket: Socket;
}

export default function ChangeTrackOverlay({ socket }: Props) {
  const [visible, setVisible] = useState(false);
  const [songs, setSongs] = useState<TrackChangeEvent[]>([]);

  useEffect(() => {
    const handleEvent = ([event]: TrackChangeEvent[][]) => {
      console.info(event);
      setSongs(event);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, TIME_VISIBLE_MS);
    };

    socket.on('change_track', handleEvent);

    return () => {
      socket.off('change_track', handleEvent);
    };
  }, [socket]);

  const renderSongs = () => {
    if (songs.length === 0) return null;
    const title = songs.map((song) => song.title).join(' - ');
    const artists = songs.map((song) => song.artists.join(', ')).join(' - ');

    return (
      <div className="flex flex-row gap-[1.5vw] items-center">
        <img src={songs[0].cover} className="h-[10vh]" alt="" />
        <div className="flex flex-col">
          <p className="text-[3vh]">{title}</p>
          <p className="text-[2vh]">{artists}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-hidden absolute w-full h-full top-0">
      <AnimatePresence>
        {visible && (
          <motion.div
            className="absolute w-full -bottom-[2.5vw] p-[1.75vw] flex items-center justify-center text-white z-100"
            initial={{ y: '20vh' }}
            animate={{ y: 0, transition: { duration: 1 } }}
            exit={{ y: '20vh', transition: { duration: 1 } }}
          >
            <GlassCard className="pt-[1vw] pb-[2vw] px-[1.75vw] z-100">{renderSongs()}</GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
