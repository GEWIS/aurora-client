import { RequestResult } from '@hey-api/client-fetch';
import PosterBaseView from '../';
import {
  PhotoPoster as ClientPhotoPoster,
  getGewisPosters,
  Poster,
  BasePosterResponse,
  GewisPosterResponse,
} from '../../../api';
import OverlayGewis from './components/OverlayGewis';
import BorrelLogoPoster from './components/types/BorrelLogoPoster';
import BorrelWallOfShamePoster from './components/types/BorrelWallOfShame';
import BorrelPriceListPoster from './components/types/BorrelPriceListPoster';
import TrainPoster from './components/types/TrainPoster';
import OlympicsPoster from './components/types/OlympicsPoster';
import PhotoPoster from './components/types/PhotoPoster';

export default function PosterGewisView() {
  const localPosterRenderer = (poster: Poster, visible: boolean, setTitle: (title: string) => void) => {
    switch (poster.type as string) {
      case 'photo':
        return (
          <PhotoPoster key={poster.name} poster={poster as ClientPhotoPoster} visible={visible} setTitle={setTitle} />
        );
      case 'borrel-logo':
        return <BorrelLogoPoster key={poster.name} />;
      case 'borrel-wall-of-shame':
        return <BorrelWallOfShamePoster key={poster.name} visible={visible} />;
      case 'borrel-price-list':
        return <BorrelPriceListPoster key={poster.name} visible={visible} />;
      case 'train':
        return <TrainPoster key={poster.name} visible={visible} timeout={poster.timeout} />;
      case 'olympics':
        return <OlympicsPoster key={poster.name} visible={visible} />;
    }
  };

  return (
    <PosterBaseView
      overlay={OverlayGewis}
      localPosterRenderer={localPosterRenderer}
      getPosters={getGewisPosters as unknown as () => Promise<RequestResult<BasePosterResponse | GewisPosterResponse>>}
    />
  );
}
