import { OverlayProps } from '../../index.tsx';
import HubbleProgressBar from './HubbleProgressBar.tsx';
import HubbleOrderView from './HubbleOrderView.tsx';

export default function OverlayHubble({
  // poster,
  seconds,
  posterIndex,
  nextPoster,
  pausePoster,
}: OverlayProps) {
  return (
    <>
      <HubbleProgressBar
        seconds={seconds}
        posterIndex={posterIndex}
        hideClock={false}
        // color={poster.color}
        color={'#ffffff'}
        nextPoster={nextPoster}
        pausePoster={pausePoster}
      />
      <HubbleOrderView orders={['001', '002']} />
    </>
  );
}
