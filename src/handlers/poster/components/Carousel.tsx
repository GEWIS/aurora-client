import { Poster } from '../entities/Poster';
import { LocalPoster, LocalPosterType, LOGO, MediaPoster } from '../../../api/Client';
import LogoPoster from './types/LogoPoster';
import { useMemo } from 'react';
import ImagePoster from './types/ImagePoster';

interface Props {
  posters: Poster[]
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
      default:
        return <div>{poster.name}</div>;
    }
  };

  return (
    <div className="absolute w-full h-full top-0 left-0">
      {posters.map((p, i) => (
        <div className={`absolute w-full h-full top-0 left-0 ${currentPoster !== i ? 'hidden' : ''}`}>
          {renderPoster(p, i)}
        </div>
      ))}
    </div>
  );
}