import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import {
  getPosterSettings,
  getStaticPosterHandlerState,
  PosterScreenSettingsResponse,
  StaticPosterHandlerState,
} from '../../api';
import BackgroundStarryNight from '../../components/backgrounds/StarryNight';
import { LogoCentered } from '../../components/aurora-logos/LogoCentered.tsx';
import ImagePoster from './types/ImagePoster';
import VideoPoster from './types/VideoPoster';
import ExternalPoster from './types/ExternalPoster';
import ProgressBar from './components/ProgressBar.tsx';
import { URL_CUSTOM_STYLESHEET, URL_PROGRESS_BAR_LOGO } from './constants.ts';

interface Props {
  socket: Socket;
}

export default function StaticPosterView({ socket }: Props) {
  const [settings, setSettings] = useState<PosterScreenSettingsResponse | undefined>();
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
    getPosterSettings()
      .then((res) => {
        if (res.response.ok && res.data) {
          setSettings(res.data);
        }
      })
      .catch((e) => console.error(e));

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
    <div className="relative w-screen h-screen" id="poster">
      <link rel="stylesheet" href="/src/handlers/poster/poster.css" />
      {/* Custom stylesheet should be imported AFTER the base stylesheet,
      because the precedence is that the last CSS definition will be used */}
      {settings?.stylesheet && <link rel="stylesheet" href={URL_CUSTOM_STYLESHEET} />}
      <div className="overflow-hidden absolute w-full h-full">{renderPoster()}</div>
      {clock && (
        <ProgressBar
          logo={settings?.progressBarLogo ? URL_PROGRESS_BAR_LOGO : ''}
          clockTick={settings?.clockShouldTick}
          minimal={settings?.defaultMinimal}
        />
      )}
    </div>
  );
}
