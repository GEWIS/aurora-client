import { OverlayProps } from '../../PosterBaseView';
import { FooterSize } from '../../../../api';
import GewisProgressBar from './GewisProgressBar';

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
