import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import registerRootHandler from './events/rootHandler';
import './index.scss';
import { LoadingView } from '@gewis/aurora-client-theme';
import { HandlerPlugin } from '@gewis/aurora-client-util';

interface Props {
  socket: Socket;
  handlers: HandlerPlugin[];
}

export default function HandlerSwitcher({ socket, handlers }: Props) {
  // TODO can we make this type more specific (using plugins) and is this something we should do?
  const [currentHandler, setCurrentHandler] = useState<string | null>(null);

  useEffect(() => {
    registerRootHandler(setCurrentHandler);
  }, []);

  const handler = handlers.find((h) => h.handlerName === currentHandler);

  return (
    <>
      {handler ? (
        <handler.component socket={socket} />
      ) : (
        <LoadingView>
          <h1 className="text-8xl font-raleway font-semibold">No handler set...</h1>
        </LoadingView>
      )}
    </>
  );
}
