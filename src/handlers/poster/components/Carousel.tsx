import { ReactNode, useEffect, useMemo } from 'react';
import { MediaPoster, Poster, PosterType_PHOTO } from '../../../api';
import LogoPoster from '../gewis/components/types/LogoPoster';
import ImagePoster from '../gewis/components/types/ImagePoster';
import ExternalPoster from '../gewis/components/types/ExternalPoster';
import VideoPoster from '../gewis/components/types/VideoPoster';

interface Props {
  posters: Poster[];
  currentPoster: number;
  setTitle: (title: string) => void;
  localPosterRenderer?: (poster: Poster, visible: boolean, setTitle: (title: string) => void) => ReactNode;
}

export default function PosterCarousel({ posters, currentPoster, setTitle, localPosterRenderer }: Props) {
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
      default:
        if (localPosterRenderer == undefined) {
          return <div>{poster.type}</div>;
        }
        return localPosterRenderer(poster, visible, setTitle);
    }
  };

  useEffect(() => {
    const poster = posters[currentPoster];
    if (poster && poster.type !== PosterType_PHOTO.PHOTO) {
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
