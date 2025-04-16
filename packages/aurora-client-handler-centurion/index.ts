import { HandlerPlugin } from '@gewis/aurora-client-util';
import { CenturionView } from './src'

export const CenturionHandler: HandlerPlugin = {
  name: 'centurion-handler',
  handlerName: 'CenturionScreenHandler',
  component: CenturionView
}