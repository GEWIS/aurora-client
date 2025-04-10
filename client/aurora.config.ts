import { defineConfig  } from '@gewis/aurora-client';
import {SpotifyHandler} from "@gewis/aurora-client-handler-spotify";
import {RoomResponsibleLegacyHandler} from "@gewis/aurora-client-handler-room-responsible-legacy";
import { StageEffectsHandler } from '@gewis/aurora-client-handler-stage-effects';
import { TimeTrailRaceHandler } from '@gewis/aurora-client-handler-time-trail-race';
import { CenturionHandler } from '@gewis/aurora-client-handler-centurion';
import {CarouselPosterHandler, StaticPosterHandler} from "@gewis/aurora-client-handler-poster";
// import alternative css
// import './poster.scss'

defineConfig({
  handlers: [
    StaticPosterHandler,
    CarouselPosterHandler,
    SpotifyHandler,
    RoomResponsibleLegacyHandler,
    StageEffectsHandler,
    TimeTrailRaceHandler,
    CenturionHandler
  ],
});
