import { HandlerPlugin } from '@gewis/aurora-client-util';
import { StaticPosterView } from './src/components/view/StaticPosterView'
import { CarouselPosterView } from './src/components/view/CarouselPosterView'

export const StaticPosterHandler: HandlerPlugin = {
  name: 'static-poster-handler',
  handlerName: 'StaticPosterHandler',
  component: StaticPosterView
}

export const CarouselPosterHandler: HandlerPlugin = {
  name: 'carousel-poster-handler',
  handlerName: 'CarouselPosterHandler',
  component: CarouselPosterView
}
