import './gewis/components/index.scss';
import { ReactNode, useEffect, useState } from 'react';
import { getPosters, Poster } from '../../api';
import PosterCarousel from './components/Carousel';

export interface OverlayProps {
  poster?: Poster;
  posterTitle: string;
  seconds?: number;
  posterIndex?: number;
  nextPoster: () => void;
  pausePoster: () => void;
  borrelMode?: boolean;
}

interface Props {
  overlay: (overlayProps: OverlayProps) => ReactNode;
  localPosterRenderer?: (poster: Poster, visible: boolean, setTitle: (title: string) => void) => ReactNode;
}

export default function PosterBaseView({ overlay, localPosterRenderer }: Props) {
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
    setPosters(newPosters.data!.posters);
    setBorrelMode(newPosters.data!.borrelMode);
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

  return (
    <div
      className="h-screen w-screen bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: 'url("base/poster-background.png")' }}
    >
      <div className="overflow-hidden w-full h-full">
        <PosterCarousel
          posters={posters || []}
          currentPoster={!posterIndex ? 0 : posterIndex}
          setTitle={setTitle}
          localPosterRenderer={localPosterRenderer}
        />
        {overlay({
          poster: selectedPoster,
          posterTitle: title,
          seconds: posterTimeout !== undefined ? selectedPoster?.timeout : undefined,
          posterIndex: posterIndex,
          nextPoster: nextPoster,
          pausePoster: pausePoster,
          borrelMode: borrelMode,
        })}
      </div>
    </div>
  );
}
