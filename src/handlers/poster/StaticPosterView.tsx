import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { getStaticPosterHandlerState, StaticPosterHandlerState } from '../../api';
import BackgroundStarryNight from '../../components/backgrounds/StarryNight';
import { LogoCentered } from '../../components/aurora-logos/LogoCentered.tsx';
import ImagePoster from './gewis/components/types/ImagePoster';
import VideoPoster from './gewis/components/types/VideoPoster';
import ExternalPoster from './gewis/components/types/ExternalPoster';
import GewisProgressBar from './gewis/components/GewisProgressBar';

interface Props {
  socket: Socket;
}

export default function StaticPosterView({ socket }: Props) {
  const [url, setUrl] = useState('');
  const [clock, setClock] = useState(false);

  const handlePosterChange = (payload: StaticPosterHandlerState) => {
    if (payload.activePoster && payload.activePoster.file) {
      setUrl(payload.activePoster.file.location);
    } else if (payload.activePoster && payload.activePoster.uri) {
      setUrl(payload.activePoster.uri);
    } else {
      setUrl('');
    }
    setClock(payload.clockVisible);
  };

  useEffect(() => {
    getStaticPosterHandlerState()
      .then((res) => {
        if (res.response.ok && res.data) {
          handlePosterChange(res.data);
        }
      })
      .catch((e) => console.error(e));

    const handlePosterChangeEvent = (payload: StaticPosterHandlerState[]) => handlePosterChange(payload[0]);

    socket.on('update_static_poster', handlePosterChangeEvent);

    return () => {
      socket.removeListener('update_static_poster', handlePosterChangeEvent);
    };
  }, [socket]);

  const renderDefaultScreen = () => {
    return (
      <div className="absolute top-0 w-full h-full">
        <BackgroundStarryNight backgroundColor="red">
          <div className="w-full h-full flex justify-center items-center">
            <LogoCentered size="5rem" />
          </div>
        </BackgroundStarryNight>
      </div>
    );
  };

  const renderPoster = () => {
    if (url === '') return renderDefaultScreen();

    const extension = url.split('.').pop();
    if (!extension) return renderDefaultScreen();

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return <ImagePoster source={url} />;
    } else if (['mp4', 'webm', 'avi', 'mkv'].includes(extension)) {
      return <VideoPoster source={url} visible />;
    } else {
      return <ExternalPoster url={url} visible />;
    }
  };

  return (
    <div className="relative w-screen h-screen">
      <div className="overflow-hidden absolute w-full h-full">{renderPoster()}</div>
      {clock && <GewisProgressBar />}
    </div>
  );
}
