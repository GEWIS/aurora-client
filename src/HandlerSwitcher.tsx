import { useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import registerRootHandler from './events/rootHandler';
import registerScreenHandler from './events/screenHandler';
import './index.css';

import { default as CenturionView } from './handlers/centurion';
import { default as SpotifyView } from './handlers/spotify';
import { default as DefaultView, LoadingView, ReloadCountdown } from './handlers/default';
import { AuthContext } from './contexts/AuthContext';
import StageEffectsView from './handlers/stage-effects';
import TimeTrailRaceView from './handlers/time-trail-race';
import PosterGewisView from './handlers/poster/gewis';
import PosterHubbleView from './handlers/poster/hubble';
import RoomResponsibleLegacyView from './handlers/room-responsible-legacy';

export enum Handlers {
  SPOTIFY = 'CurrentlyPlayingTrackHandler',
  CENTURION = 'CenturionScreenHandler',
  GEWIS_POSTER = 'GewisPosterScreenHandler',
  HUBBLE_POSTER = 'HubblePosterScreenHandler',
  STAGE_EFFECTS = 'StageEffectsHandler',
  TIME_TRAIL_RACE = 'TimeTrailRaceScreenHandler',
  ROOM_RESPONSIBLE_LEGACY = 'RoomResponsibleLegacyHandler',
}

export default function HandlerSwitcher() {
  const [currentHandler, setCurrentHandler] = useState<Handlers | null>(null);
  const [screenSocket, setScreenSocket] = useState<Socket | null>(null);

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    registerRootHandler(setCurrentHandler);
    registerScreenHandler(setScreenSocket);
  }, [user]);

  if (loading) {
    return (
      <LoadingView>
        <h1 className="text-8xl">Initializing the screen...</h1>
      </LoadingView>
    );
  }

  if (!user) {
    return (
      <LoadingView>
        <h1 className="text-8xl">Unauthenticated</h1>
        <ReloadCountdown />
      </LoadingView>
    );
  }

  if (!screenSocket) {
    return (
      <LoadingView>
        <h1 className="text-8xl">Connecting to websocket...</h1>
      </LoadingView>
    );
  }

  switch (currentHandler) {
    case Handlers.CENTURION:
      return <CenturionView socket={screenSocket} />;
    case Handlers.SPOTIFY:
      return <SpotifyView socket={screenSocket} />;
    case Handlers.GEWIS_POSTER:
      return <PosterGewisView />;
    case Handlers.HUBBLE_POSTER:
      return <PosterHubbleView />;
    case Handlers.STAGE_EFFECTS:
      return <StageEffectsView socket={screenSocket} />;
    case Handlers.TIME_TRAIL_RACE:
      return <TimeTrailRaceView socket={screenSocket} />;
    case Handlers.ROOM_RESPONSIBLE_LEGACY:
      return <RoomResponsibleLegacyView />;
    default:
      return <DefaultView />;
  }
}
