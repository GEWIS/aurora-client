import ProgressBarSlider from '../../components/ProgressBarSlider.tsx';
import Clock from './Clock.tsx';

interface Props {
  seconds?: number;
  posterIndex?: number;
  color?: string;
  hideClock?: boolean;
  nextPoster?: () => void;
  pausePoster?: () => void;
}

export default function HubbleProgressBar({ seconds, posterIndex, color, hideClock, nextPoster, pausePoster }: Props) {
  return (
    <div
      className="absolute w-full bottom-0 z-50 text-white flex flex-col text-5xl"
      style={{ backgroundColor: '', height: '14.3518519%' }}
    >
      <div className="absolute w-full" style={{ height: '3%', marginTop: -2, bottom: 0 }}>
        {seconds !== undefined && posterIndex && (
          <ProgressBarSlider seconds={seconds} posterIndex={posterIndex} color={color || '#ffffff'} />
        )}
      </div>
      <div className={`flex-grow flex justify-center items-center px-6`}>
        <div className="relative h-full py-3" style={{ width: '10%' }}>
          <div className="h-full flex flex-row gap-6 items-center"></div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          className="flex-grow h-full text-center text-shadow whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ minHeight: '1rem' }}
          onClick={pausePoster}
        ></div>
        {!hideClock && (
          <div className="text-right h-full" style={{ width: '20%' }}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div className="h-full" onClick={nextPoster}>
              <Clock color={color || '#ffffff'} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

HubbleProgressBar.defaultProps = {
  color: '#ffffff',
  hideClock: false,
  nextPoster: undefined,
  pausePoster: undefined,
};
