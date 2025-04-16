import { HandlerPlugin } from '@gewis/aurora-client-util';
import { TimeTrailRaceView } from './src'

export const TimeTrailRaceHandler: HandlerPlugin = {
  name: 'time-trail-race-handler',
  handlerName: 'TimeTrailRaceScreenHandler',
  component: TimeTrailRaceView
}