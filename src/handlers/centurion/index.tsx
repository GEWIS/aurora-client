import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import { clsx } from 'clsx';
import { getCenturionState } from '../../api';
import Background from './components/Background';
import styles from './centurion.module.css';
import Strobe from './components/Strobe';
import Information from './components/Information';

interface Props {
  socket: Socket;
}

//interface TrackChangeEvent {
//  title: string;
//  artists: string[];
//  cover?: string;
//}

interface MixTape {
  coverUrl: string;
  name: string;
  songFile: string;
  feed: FeedEvent[];
}

export type FeedEvent = {
  timestamp: number;
} & (Horn | Song | Beat);

type Horn = {
  type: 'horn';
  data: {
    counter: number;
  };
};

export type SongData = {
  artist: string;
  title: string;
};

type Song = {
  type: 'song';
  data: SongData | SongData[];
};

type Beat = {
  type: 'beat';
};

type HornEvent = {
  strobeTime: number;
  counter: number;
};

enum Colors {
  'white' = '#cccccc',
  'blindingWhite' = '#ffffff',
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
  const [artist, setArtists] = useState<string | null>('Roy Kakkenberg, Gijs de Man & Samuel Oosterholt');
  const [song, setSong] = useState<string | null>('Wie dit leest, trekt een bak!');

  const [mixtape, setMixtape] = useState<Pick<MixTape, 'name' | 'coverUrl'> | null>(null);
  const [status, setStatus] = useState<Status>(Status.STOPPED);

  const [hornCount, setHornCount] = useState<number>(-1);
  const [strobe, setStrobe] = useState<boolean>(false);
  const [colors, setColors] = useState<CurrentColors>({
    start: Colors.lightpink,
    end: Colors.orange,
  });

  React.useEffect(() => {
    getCenturionState().then((res) => {
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
    });

    socket.on('loaded', (mixTapes: MixTape[]) => {
      const mixTape = mixTapes[0];
      setMixtape(mixTape);
      setStatus(Status.READY);
      setHornCount(-1);
    });

    socket.on('start', () => {
      setArtists('GEWIS');
      setSong('Narrowcasting Software ©');

      setHornCount(0);
      setStatus(Status.PLAYING);
    });

    socket.on('stop', () => {
      setArtists('GEWIS');
      setSong('Narrowcasting Software ©');

      setStatus(Status.STOPPED);
      setHornCount(-1);
    });

    socket.on('change_track', (event: unknown[]) => {
      const trackChangeEvent = event[0];
      setArtists(trackChangeEvent[0].artists.join(', '));
      setSong(trackChangeEvent[0].title);
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

    socket.on('change_colors', (newColorsEvent: string[][]) => {
      const newColors = newColorsEvent[0];
      setColors({
        start: Colors[newColors[0]],
        end: Colors[newColors[1]],
      });
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);

  const getRandomInt = () => {
    return Math.floor(Math.random() * 2 * hornCount) - hornCount;
  };

  const makeTextDrunk = (note: string) => {
    return [...note].map((letter, index) => {
      // Range [-#shots, #shots]
      const randomInt = getRandomInt();
      return (
        <span
          key={index}
          className={clsx(styles.drunk, 'z-20')}
          style={{
            ['--random-rotation' as string]: `${randomInt / 3}deg`,
            ['--random-time' as string]: `${hornCount === 0 ? '500s' : `${(1 / hornCount) * 500}s`}`,
            display: 'inline-block',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      );
    });
  };

  const renderHornCount = () => {
    return <p className="text-white text-[550px] -m-20">{makeTextDrunk(hornCount.toString())}</p>;
  };

  const renderBackground = () => {
    if (hornCount >= 0 && mixtape) return <Background colors={colors} progression={hornCount < 0 ? 0 : hornCount} />;

    return (
      <div className="h-screen w-full top-0 left-0 absolute -z-20 bg-black overflow-hidden">
        <div
          className="h-full w-full bg-center bg-cover bg-no-repeat -z-30"
          style={{
            filter: 'blur(2px)',
            backgroundImage: 'url("/centurion/scooter.jpeg")',
          }}
        ></div>
      </div>
    );
  };

  return (
    <>
      {hornCount === -1 && mixtape && (
        <Information title={mixtape.name} albumCover={mixtape.coverUrl} description={status} />
      )}

      {status === Status.PLAYING && (
        <div className="h-screen flex items-center justify-center">
          <div className={clsx('w-fit flex flex-col justify-center text-center', styles.text)}>
            {hornCount >= 0 && renderHornCount()}
            <p className="text-white text-7xl font-bold mb-10">{makeTextDrunk(artist.toUpperCase())}</p>
            <p className="text-white text-7xl">{makeTextDrunk(song.toUpperCase())}</p>
          </div>
        </div>
      )}

      {strobe && <Strobe hornCount={hornCount} />}

      {renderBackground()}
    </>
  );
}
