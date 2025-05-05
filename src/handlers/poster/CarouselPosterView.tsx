import './components/index.scss';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { FooterSize, getPosters, getPosterSettings, Poster, PosterScreenSettingsResponse } from '../../api';
import ChangeTrackOverlay from '../../overlays/ChangeTrackOverlay';
import PosterCarousel from './components/Carousel';
import ProgressBar from './components/ProgressBar';
import { URL_CUSTOM_STYLESHEET, URL_PROGRESS_BAR_LOGO } from './constants';
import PosterWatermark from './components/PosterWatermark';

interface Props {
  socket: Socket;
}

export default function CarouselPosterView({ socket }: Props) {
  const [settings, setSettings] = useState<PosterScreenSettingsResponse | undefined>();
  const [posters, setPosters] = useState<Poster[]>();
  const [borrelMode, setBorrelMode] = useState(false);
  const [posterIndex, setPosterIndex] = useState<number>();
  // ReturnType used instead of number as one of the dependencies uses @types/node as dependency
  const [posterTimeout, setPosterTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  const refreshPosters = async () => {
    setLoading(true);
    // TODO what to do if poster cannot be fetched?
    const newPosters = await getPosters();
    if (newPosters.response.ok && newPosters.data) {
      setPosters(newPosters.data.posters);
      setBorrelMode(newPosters.data.borrelMode);
    }
    setLoading(false);
  };

  const nextPoster = () => {
    if (!posters) {
      setPosterIndex(undefined);
    } else {
      setPosterIndex((i) => (i! + 1) % posters.length);
    }
  };

  const pausePoster = () => {
    if (posterTimeout) clearTimeout(posterTimeout);
    setPosterTimeout(null);
  };

  useEffect(() => {
    if (!posters || posters.length === 0 || posterIndex === undefined) return;
    if (posterTimeout) clearTimeout(posterTimeout);

    if (posterIndex === 0) {
      refreshPosters().catch((e) => console.error(e));
    }

    const nextPoster = posters[posterIndex];
    const timeout = setTimeout(() => setPosterIndex((i) => (i! + 1) % posters.length), nextPoster.timeout * 1000);
    setPosterTimeout(timeout);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO; should these be exhaustive?
  }, [posterIndex]);

  useEffect(() => {
    getPosterSettings()
      .then((res) => {
        if (res.response.ok && res.data) {
          setSettings(res.data);
        }
      })
      .catch((e) => console.error(e));

    refreshPosters().catch((e) => console.error(e));

    return () => {
      if (posterTimeout) clearTimeout(posterTimeout);
    };
    // We should do this only once, in contrary what ESLint thinks we should do
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (posters && !posterTimeout && !loading) {
      const randomIndex = Math.floor(Math.random() * posters.length);
      setPosterIndex(randomIndex);
    }
  }, [posters, loading, posterTimeout]);

  const selectedPoster = posters && posters.length > 0 && posterIndex !== undefined ? posters[posterIndex] : undefined;

  const progressBarMinimal = settings?.defaultMinimal || selectedPoster?.footer === FooterSize.MINIMAL;

  return (
    <>
      <div
        className="h-screen w-screen bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: 'url("base/poster-background.png")' }}
        id="poster"
      >
        <link rel="stylesheet" href="/src/handlers/poster/poster.css" />
        {/* Custom stylesheet should be imported AFTER the base stylesheet,
      because the precedence is that the last CSS definition will be used */}
        {settings?.stylesheet && <link rel="stylesheet" href={URL_CUSTOM_STYLESHEET} />}
        <div className="overflow-hidden w-full h-full">
          <PosterCarousel posters={posters || []} currentPoster={!posterIndex ? 0 : posterIndex} setTitle={setTitle} />
          <PosterWatermark
            posterIndex={posterIndex ?? -1}
            progressBarMinimal={progressBarMinimal}
            progressBarLogo={settings?.progressBarLogo}
            borrelMode={borrelMode}
          />
          <ProgressBar
            // poster={selectedPoster}
            title={title}
            seconds={posterTimeout !== undefined ? selectedPoster?.timeout : undefined}
            posterIndex={posterIndex}
            minimal={progressBarMinimal}
            nextPoster={nextPoster}
            pausePoster={pausePoster}
            borrelMode={borrelMode}
            logo={settings?.progressBarLogo ? URL_PROGRESS_BAR_LOGO : ''}
            progressBarColor={selectedPoster?.color || settings?.defaultProgressBarColor}
            clockColor={selectedPoster?.color}
            clockTick={settings?.clockShouldTick}
          />
        </div>
      </div>
      <ChangeTrackOverlay socket={socket} />
    </>
  );
}
