import { useEffect, useMemo } from 'react';
import { MediaPoster, PhotoPoster as ClientPhotoPoster, Poster } from '../../../api';
import LogoPoster from './types/LogoPoster';
import ImagePoster from './types/ImagePoster';
import ExternalPoster from './types/ExternalPoster';
import VideoPoster from './types/VideoPoster';
import PhotoPoster from './types/PhotoPoster';
import TrainPoster from './types/TrainPoster';
import BorrelWallOfShamePoster from './types/BorrelWallOfShame';
import BorrelPriceListPoster from './types/BorrelPriceListPoster';
import BorrelLogoPoster from './types/BorrelLogoPoster';
import OlympicsPoster from './types/OlympicsPoster';

interface Props {
  posters: Poster[];
  currentPoster: number;
  setTitle: (title: string) => void;
}

export default function PosterCarousel({ posters, currentPoster, setTitle }: Props) {
  const previousPoster = useMemo(() => (currentPoster - 1) % posters.length, [currentPoster, posters.length]);
  const nextPoster = useMemo(() => (currentPoster + 1) % posters.length, [currentPoster, posters.length]);

  const renderPoster = (poster: Poster, index: number) => {
    if (index !== previousPoster && index !== currentPoster && index !== nextPoster) return null;

    const visible = index === currentPoster || index === previousPoster;

    switch (poster.type as string) {
      case 'logo':
        return <LogoPoster key={poster.name} />;
      case 'img':
        return <ImagePoster key={poster.name} source={(poster as MediaPoster).source} />;
      case 'extern':
        return <ExternalPoster key={poster.name} url={(poster as MediaPoster).source[0]} visible={visible} />;
      case 'video':
        return <VideoPoster key={poster.name} source={(poster as MediaPoster).source} visible={visible} />;
      case 'photo':
        return (
          <PhotoPoster key={poster.name} poster={poster as ClientPhotoPoster} visible={visible} setTitle={setTitle} />
        );
      case 'borrel-logo':
        return <BorrelLogoPoster key={poster.name} />;
      case 'borrel-wall-of-shame':
        return <BorrelWallOfShamePoster key={poster.name} visible={visible} />;
      case 'borrel-price-list':
        return <BorrelPriceListPoster key={poster.name} visible={visible} />;
      case 'train':
        return <TrainPoster key={poster.name} visible={visible} timeout={poster.timeout} />;
      case 'olympics':
        return <OlympicsPoster key={poster.name} visible={visible} />;
      default:
        return <div key={poster.name}>{poster.name}</div>;
    }
  };

  useEffect(() => {
    const poster = posters[currentPoster];
    if (poster && poster.type !== 'photo') {
      setTitle(poster.label);
    }
  }, [posters, currentPoster, setTitle]);

  return (
    <div className="w-full h-full top-0 left-0">
      {posters.map((p, i) => (
        <div
          key={i}
          className={`
            absolute w-full h-full top-0 left-0
            transition-opacity duration-500
            ${[previousPoster, currentPoster].includes(i) ? 'opacity-100' : 'opacity-0'}
            ${[currentPoster, nextPoster].includes(i) ? 'z-10' : 'z-0'}
          `}
        >
          {renderPoster(p, i)}
        </div>
      ))}
    </div>
  );
}
