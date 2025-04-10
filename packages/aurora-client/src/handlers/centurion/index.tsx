import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { clsx } from 'clsx';
import { getCenturionState, CenturionStateResponse, RgbColor, TrackChangeEvent } from '../../api';
import Background from './components/Background';
import styles from './centurion.module.css';
import Strobe from './components/Strobe';
import Information from './components/Information';

interface Props {
  socket: Socket;
}

type MixTape = CenturionStateResponse['tape'];

type HornEvent = {
  strobeTime: number;
  counter: number;
};

enum Colors {
  'white' = '#cccccc',
  'blindingwhite' = '#ffffff',
  'uv' = '#7e48a2',
  'lightpink' = '#ecc9f6',
  'pink' = '#dd75ec',
  'orange' = '#f18900',
  'purple' = '#8800b6',
  'brown' = '#502626',
  'red' = '#ff0000',
  'yellow' = '#fff225',
  'lime' = '#9cff55',
  'green' = '#169300',
  'blue' = '#003a91',
  'gold' = '#d9923f',
  'rosered' = '#c91651',
  'cyan' = '#07fff7',
  'lightblue' = '#98e7ff',
}

export interface CurrentColors {
  start: Colors;
  end: Colors;
}

enum Status {
  'STOPPED' = 'Stopped',
  'READY' = 'Get ready!',
  'PLAYING' = 'Playing',
}

export default function CenturionView({ socket }: Props) {
  const [artist, setArtists] = useState<string | null>(null);
  const [song, setSong] = useState<string | null>(null);

  const [mixtape, setMixtape] = useState<MixTape | null>(null);
  const [status, setStatus] = useState<Status>(Status.STOPPED);

  const [hornCount, setHornCount] = useState<number | undefined>();
  const [strobe, setStrobe] = useState<boolean>(false);
  const [colors, setColors] = useState<CurrentColors>({
    start: Colors.lightpink,
    end: Colors.orange,
  });

  useEffect(() => {
    // TODO what to do if centurion state cannot be fetched?
    getCenturionState()
      .then((res) => {
        if (!res || !res.data) return;
        if (res.data.tape) {
          setMixtape(res.data.tape);
          setStatus(Status.READY);
        }
        if (res.data.lastHorn) setHornCount(res.data.lastHorn.data.counter);
        if (res.data.lastSong && Array.isArray(res.data.lastSong.data)) {
          setSong(res.data.lastSong.data[0].title);
          setArtists(res.data.lastSong.data[0].artist);
        }
        if (res.data.lastSong && !Array.isArray(res.data.lastSong.data)) {
          setSong(res.data.lastSong.data.title);
          setArtists(res.data.lastSong.data.artist);
        }
        if (res.data.colors) {
          setColors({
            start: Colors[res.data.colors[0]],
            end: Colors[res.data.colors[1]],
          });
        }
        if (res.data.playing) setStatus(Status.PLAYING);
      })
      .catch((e) => console.error(e));

    socket.on('loaded', (mixTapes: MixTape[]) => {
      const mixTape = mixTapes[0];

      setMixtape(mixTape ?? null);
      setStatus(Status.READY);
      setHornCount(undefined);
    });

    socket.on('start', () => {
      if (hornCount === undefined) setHornCount(-1);
      setStatus(Status.PLAYING);
    });

    socket.on('stop', () => {
      setStatus(Status.STOPPED);
    });

    socket.on('change_track', (event: TrackChangeEvent[][]) => {
      const track = event[0][0];
      setArtists(track.artists.join(', '));
      setSong(track.title);
      setStatus(Status.PLAYING);
    });

    socket.on('horn', (hornEvent: HornEvent[]) => {
      const { strobeTime, counter } = hornEvent[0];
      setStrobe(true);
      setTimeout(() => {
        setStrobe(false);
      }, strobeTime);

      setStatus(Status.PLAYING);
      setHornCount(counter);
    });

    socket.on('change_colors', (newColorsEvent: RgbColor[][]) => {
      const colors = newColorsEvent[0];
      setColors({
        start: Colors[colors[0]],
        end: Colors[colors[1]],
      });
    });

    return () => {
      socket.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const getRandomInt = () => {
    if (hornCount === undefined) return 0;
    return Math.floor(Math.random() * 2 * hornCount) - hornCount;
  };

  const makeTextDrunk = (note?: string) => {
    if (!note) return null;
    return note.split(' ').map((word, i) => {
      return (
        <div key={`${word}-${i}`} className="flex flex-nowrap justify-center me-6">
          {[...word].map((letter, j) => {
            // Range [-#shots, #shots]
            const randomInt = getRandomInt();
            return (
              <div
                key={`${letter}-${j}`}
                className={clsx(styles.drunk, 'z-20')}
                style={{
                  ['--random-rotation' as string]: `${randomInt / 3}deg`,
                  ['--random-time' as string]: `${hornCount === 0 || hornCount === undefined ? '500s' : `${(1 / hornCount) * 500}s`}`,
                  display: 'inline-block',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </div>
            );
          })}
        </div>
      );
    });
  };

  const renderHornCount = () => {
    if (hornCount === undefined) return null;
    return <div className="text-white text-[550px] -m-20">{makeTextDrunk(hornCount.toString())}</div>;
  };

  const renderBackground = () => {
    if (hornCount !== undefined && mixtape)
      return <Background colors={colors} progression={!hornCount ? 0 : hornCount} />;

    return (
      <div className="h-screen w-full top-0 left-0 absolute -z-20 bg-black overflow-hidden">
        <div
          className="h-full w-full bg-center bg-cover bg-no-repeat -z-30"
          style={{
            filter: 'blur(0)',
            backgroundImage: 'url("/centurion/scooter.jpeg")',
          }}
        ></div>
      </div>
    );
  };

  return (
    <>
      {mixtape && status !== Status.PLAYING && (
        <Information title={mixtape.name} artist={mixtape.artist} albumCover={mixtape.coverUrl} description={status} />
      )}

      {status === Status.PLAYING && (
        <div className="h-screen flex items-center justify-center overflow-hidden">
          <div className={clsx('w-fit flex flex-col justify-center text-center', styles.text)}>
            {hornCount !== undefined && hornCount >= 0 && renderHornCount()}
            <div className="flex flex-wrap justify-center text-white text-7xl font-bold mb-10 px-12">
              {makeTextDrunk(artist?.toUpperCase())}
            </div>
            <div className="flex flex-wrap justify-center text-white text-7xl px-12">
              {makeTextDrunk(song?.toUpperCase())}
            </div>
          </div>
        </div>
      )}

      {strobe && <Strobe hornCount={hornCount ?? 0} />}

      {renderBackground()}
    </>
  );
}
