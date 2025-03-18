import { OverlayProps } from '../../CarouselPosterView.tsx';
import HubbleProgressBar from './HubbleProgressBar';
export default function OverlayHubble({ poster, seconds, posterIndex, nextPoster, pausePoster }: OverlayProps) {
  return (
    <>
      <HubbleProgressBar
        seconds={seconds}
        posterIndex={posterIndex}
        hideClock={false}
        color={poster?.color}
        nextPoster={nextPoster}
        pausePoster={pausePoster}
      />
    </>
  );
}
