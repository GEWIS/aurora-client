import { HandlerPlugin } from '@gewis/aurora-client-util';
import { SpotifyView } from './src'

export const SpotifyHandler: HandlerPlugin = {
  name: 'spotify-handler',
  handlerName: 'CurrentlyPlayingTrackHandler',
  component: SpotifyView
}