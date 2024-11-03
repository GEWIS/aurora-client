import Clock from './Clock';
import ProgressBarSlider from './ProgressBarSlider';

interface Props {
  title?: string;
  seconds?: number;
  posterIndex?: number;
  minimal?: boolean;
  hide?: boolean;
  borrelMode?: boolean;
  nextPoster?: () => void;
  pausePoster?: () => void;
}

export default function ProgressBar({
  title,
  seconds,
  posterIndex,
  minimal,
  hide,
  borrelMode,
  nextPoster,
  pausePoster,
}: Props) {
  return (
    <div
      className="absolute w-full bottom-0 z-50 text-white flex flex-col text-5xl"
      style={{ backgroundColor: !minimal && !hide ? 'rgba(0, 0, 0, 0.5)' : '', height: 80 }}
    >
      <div className="absolute w-full" style={{ height: 5, marginTop: -2, bottom: minimal || hide ? 0 : '' }}>
        {seconds !== undefined && posterIndex >= 0 && <ProgressBarSlider seconds={seconds} posterIndex={posterIndex} />}
      </div>
      <div className={`flex-grow flex justify-center items-center px-6 ${hide ? 'hidden' : ''}`}>
        <div className="relative h-full py-3" style={{ width: 200 }}>
          <div className="h-full flex flex-row gap-6 items-center">
            <svg
              style={{ filter: 'invert(100%) drop-shadow(3px 5px 2px rgb(0 0 0 /0.4))' }}
              viewBox="0 0 50 100"
              height="50"
            >
              <image x="0" y="0" height="100%" width="100%" xlinkHref={'/base/gewis-base-black.svg'} />
            </svg>
            {borrelMode && (
              <svg
                style={{
                  filter: 'brightness(0) invert(1) drop-shadow(3px 5px 2px rgb(0 0 0 /0.4))',
                }}
                viewBox="0 0 100 100"
                height="40"
              >
                <image x="0" y="0" height="100%" width="100%" xlinkHref={'/borrel/sudosos.svg'} />
              </svg>
            )}
          </div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          className="flex-grow text-center text-shadow whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ minHeight: '1rem' }}
          onClick={pausePoster}
        >
          {!minimal && title}
        </div>
        <div className="text-right" style={{ width: 200 }}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div onClick={nextPoster}>
            <Clock />
          </div>
        </div>
      </div>
    </div>
  );
}

ProgressBar.defaultProps = {
  minimal: false,
  hide: false,
  borrelMode: false,
  nextPoster: undefined,
  pausePoster: undefined,
};
