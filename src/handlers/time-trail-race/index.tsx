import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import {
  getRaceState,
  PlayerParams,
  RaceFinishedEvent,
  RacePlayerReadyEvent,
  RacePlayerRegisteredEvent,
  RaceScoreboardEvent,
  RaceStartedEvent,
  ScoreboardItem,
  TimeTrailRaceState,
} from '../../api';
import StopWatch from './components/StopWatch';
import NextPlayer from './components/NextPlayer';
import Scoreboard from './components/Scoreboard';

interface Props {
  socket: Socket;
}

export default function TimeTrailRaceView({ socket }: Props) {
  const [state, setState] = useState<TimeTrailRaceState>(undefined);
  const [sessionName, setSessionName] = useState<string>('');
  const [player, setPlayer] = useState<PlayerParams | undefined>();
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [scoreboard, setScoreboard] = useState<ScoreboardItem[]>([]);

  useEffect(() => {
    getRaceState().then((res) => {
      const { state: s, sessionName: n, scoreboard: sb } = res.data;
      setState(s);
      setSessionName(n);
      setScoreboard(sb);
    });

    socket.on('race-initialized', ([{ state: s, sessionName: n }]) => {
      setState(s as unknown as TimeTrailRaceState);
      setSessionName(n);
      setScoreboard([]);
      setPlayer(undefined);
    });

    socket.on(
      'race-player-registered',
      ([{ state: s, player: p, sessionName: n, scoreboard: sb }]: RacePlayerRegisteredEvent[]) => {
        setState(s as unknown as TimeTrailRaceState);
        setSessionName(n);
        setPlayer(p);
        setScoreboard(sb);
      },
    );

    socket.on('race-player-ready', ([{ state: s, player: p, sessionName: n }]: RacePlayerReadyEvent[]) => {
      setState(s as unknown as TimeTrailRaceState);
      setSessionName(n);
      setPlayer(p);
    });

    socket.on('race-started', ([{ state: s, sessionName: n, player: p, startTime: t }]: RaceStartedEvent[]) => {
      setState(s as unknown as TimeTrailRaceState);
      setSessionName(n);
      setPlayer(p);
      setStartTime(new Date(t));
    });

    socket.on('race-finished', ([{ state: s, player: p, scoreboard: sb, sessionName: n }]: RaceFinishedEvent[]) => {
      setState(s as unknown as TimeTrailRaceState);
      setSessionName(n);
      setPlayer(p);
      setScoreboard(sb);
      setStartTime(undefined);
    });

    socket.on('race-scoreboard', ([{ state: s, player: p, scoreboard: sb, sessionName: n }]: RaceScoreboardEvent[]) => {
      setState(s as unknown as TimeTrailRaceState);
      setSessionName(n);
      setPlayer(p);
      setScoreboard(sb);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);

  const renderContent = () => {
    switch (state) {
      case 'PLAYER_READY':
        return (
          <div className="h-full flex justify-center items-center" style={{ fontSize: '16rem' }}>
            READY?!
          </div>
        );
      case 'STARTED':
        return <StopWatch startTime={startTime} />;
      case 'FINISHED':
        return null;
      case 'INITIALIZED':
      case 'SCOREBOARD':
      default:
        return <Scoreboard scoreboard={scoreboard} player={player} />;
    }
  };

  return (
    <div className="h-screen pt-20 pb-10 flex flex-col items-center bg-black text-white gap-20">
      <div className="text-center flex flex-col gap-4 items-center">
        <h1 className="text-8xl">Spoelbakkenrace</h1>
        <h4 className="text-5xl italic">{sessionName}</h4>
      </div>
      <div className="flex-1 overflow-hidden">{renderContent()}</div>
      {state === 'PLAYER_REGISTERED' && (
        <div className="relative overflow-hidden w-full h-12">
          <NextPlayer name={player?.name} bac={player?.bac} delay={0} time={10000} />
          <NextPlayer name={player?.name} bac={player?.bac} delay={-3333} time={10000} />
          <NextPlayer name={player?.name} bac={player?.bac} delay={-6667} time={10000} />
        </div>
      )}
    </div>
  );
}
