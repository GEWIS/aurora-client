import { useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { LoadingView, ReloadCountdown } from '@gewis/aurora-client-theme';
import OrdersOverlay from './overlays/OrdersOverlay';
import HandlerSwitcher, { HandlerPlugin } from './HandlerSwitcher';
import { AuthContext } from './contexts/AuthContext';
import registerScreenHandler from './events/screenHandler';

interface Props {
  handlers: HandlerPlugin[];
}

export default function ClientView({ handlers }: Props) {
  const [screenSocket, setScreenSocket] = useState<Socket | null>(null);

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    registerScreenHandler(setScreenSocket);
  }, [user]);

  if (loading) {
    return (
      <LoadingView>
        <h1 className="text-8xl font-raleway font-semibold">Initializing the screen...</h1>
      </LoadingView>
    );
  }

  if (!user) {
    return (
      <LoadingView>
        <h1 className="text-8xl font-raleway font-semibold">Unauthenticated</h1>
        <ReloadCountdown />
      </LoadingView>
    );
  }

  if (!screenSocket) {
    return (
      <LoadingView>
        <h1 className="text-8xl font-raleway font-semibold">Connecting to websocket...</h1>
      </LoadingView>
    );
  }
  return (
    <>
      <OrdersOverlay socket={screenSocket} />
      <HandlerSwitcher socket={screenSocket} handlers={handlers} />
    </>
  );
}
