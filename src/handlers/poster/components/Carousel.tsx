import { MediaPoster, PhotoPoster as ClientPhotoPoster, Poster } from '../../../api';
import LogoPoster from './types/LogoPoster';
import { useMemo } from 'react';
import ImagePoster from './types/ImagePoster';
import ExternalPoster from './types/ExternalPoster';
import VideoPoster from './types/VideoPoster';
import PhotoPoster from './types/PhotoPoster';
import TrainPoster from './types/TrainPoster';
import BorrelWallOfShamePoster from './types/BorrelWallOfShame';

interface Props {
  posters: Poster[];
  currentPoster: number;
}

export default function PosterCarousel({ posters, currentPoster }: Props) {
  const previousPoster = useMemo(() => (currentPoster - 1) % posters.length, [currentPoster]);
  const nextPoster = useMemo(() => (currentPoster + 1) % posters.length, [currentPoster]);

  const renderPoster = (poster: Poster, index: number) => {
    if (index !== previousPoster && index !== currentPoster && index !== nextPoster) return null;

    switch (poster.type as string) {
      case 'logo':
        return <LogoPoster />;
      case 'img':
        return <ImagePoster source={(poster as MediaPoster).source} />;
      case 'extern':
        return <ExternalPoster url={(poster as MediaPoster).source[0]} />;
      case 'video':
        return <VideoPoster source={(poster as MediaPoster).source} />;
      case 'photo':
        return <PhotoPoster poster={poster as ClientPhotoPoster} />;
      case 'borrel-wall-of-shame':
        return (
          <BorrelWallOfShamePoster visible={index === currentPoster || index === previousPoster} />
        );
      case 'train':
        return (
          <TrainPoster
            visible={index === currentPoster || index === previousPoster}
            timeout={poster.timeout}
          />
        );
      default:
        return <div>{poster.name}</div>;
    }
  };

  return (
    <div className="w-full h-full top-0 left-0">
      {posters.map((p, i) => (
        <div
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
