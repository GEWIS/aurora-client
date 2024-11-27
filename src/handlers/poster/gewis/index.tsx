import PosterBaseView from '../index.tsx';
import { PhotoPoster as ClientPhotoPoster, Poster } from '../../../api';
import OverlayGewis from './components/OverlayGewis.tsx';
import BorrelLogoPoster from './components/types/BorrelLogoPoster.tsx';
import BorrelWallOfShamePoster from './components/types/BorrelWallOfShame.tsx';
import BorrelPriceListPoster from './components/types/BorrelPriceListPoster.tsx';
import TrainPoster from './components/types/TrainPoster.tsx';
import OlympicsPoster from './components/types/OlympicsPoster.tsx';
import PhotoPoster from './components/types/PhotoPoster.tsx';

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

  return <PosterBaseView overlay={OverlayGewis} localPosterRenderer={localPosterRenderer} />;
}
