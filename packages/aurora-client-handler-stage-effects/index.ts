import { HandlerPlugin } from '@gewis/aurora-client-util';
import { StageEffectsView } from './src'

export const StageEffectsHandler: HandlerPlugin = {
  name: 'stage-effects-handler',
  handlerName: 'StageEffectsHandler',
  component: StageEffectsView
}