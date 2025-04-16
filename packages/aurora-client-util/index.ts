import React from 'react';
import { Socket } from 'socket.io-client';

export type HandlerComponent = React.FC<{ socket: Socket }>;

export type HandlerPlugin = {
  name: string;
  handlerName: string;
  component: HandlerComponent;
}