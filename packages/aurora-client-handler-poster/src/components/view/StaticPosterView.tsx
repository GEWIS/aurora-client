import './../../index.scss';
import { useEffect, useState } from 'react';
import {
  getPosterSettings,
  getStaticPosterHandlerState,
  PosterScreenSettingsResponse,
  StaticPosterHandlerState,
} from '@gewis/aurora-client-api';
import { LogoCentered, StarryNight } from '@gewis/aurora-client-theme';
import { HandlerComponent } from '@gewis/aurora-client-util';
import ImagePoster from '../../types/ImagePoster';
import VideoPoster from '../../types/VideoPoster';
import ExternalPoster from '../../types/ExternalPoster';
import ProgressBar from '../base/ProgressBar';
import { URL_PROGRESS_BAR_LOGO } from '../helpers/constants';

export const StaticPosterView: HandlerComponent = ({ socket }) => {
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
    let color: string;
    if (
      settings &&
      settings.defaultProgressBarColor &&
      settings.defaultProgressBarColor !== '#ffffff' &&
      settings.defaultProgressBarColor !== '#fff'
    ) {
      color = settings.defaultProgressBarColor;
    } else {
      color = 'orange';
    }
    return (
      <div className="absolute top-0 w-full h-full">
        <StarryNight backgroundColor={color}>
          <div className="w-full h-full flex justify-center items-center">
            <LogoCentered size="5rem" />
          </div>
        </StarryNight>
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
};
