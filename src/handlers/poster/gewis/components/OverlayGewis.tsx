import { OverlayProps } from '../../index.tsx';
import { FooterSize } from '../../../../api';
import GewisProgressBar from './GewisProgressBar.tsx';

export default function OverlayGewis({
  poster,
  posterTitle,
  seconds,
  posterIndex,
  nextPoster,
  pausePoster,
  borrelMode,
}: OverlayProps) {
  return (
    <GewisProgressBar
      title={posterTitle}
      seconds={seconds}
      posterIndex={posterIndex}
      minimal={poster?.footer === FooterSize.MINIMAL}
      hide={poster?.footer === FooterSize.HIDDEN}
      borrelMode={borrelMode}
      nextPoster={nextPoster}
      pausePoster={pausePoster}
    />
  );
}
