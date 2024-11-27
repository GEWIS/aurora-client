import './components/index.scss';
import PosterBaseView from '../index.tsx';
import OverlayHubble from './components/OverlayHubble.tsx';

export default function PosterHubbleView() {
  return <PosterBaseView overlay={OverlayHubble} />;
}
