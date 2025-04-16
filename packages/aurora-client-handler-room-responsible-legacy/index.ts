import { HandlerPlugin } from '@gewis/aurora-client-util';
import { RoomResponsibleLegacyView } from './src'

export const RoomResponsibleLegacyHandler: HandlerPlugin = {
  name: 'RoomResponsibleLegacyHandler',
  handlerName: 'RoomResponsibleLegacyHandler',
  component: RoomResponsibleLegacyView
}