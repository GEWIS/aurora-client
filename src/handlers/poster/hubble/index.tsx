import './components/index.scss';
import { RequestResult } from '@hey-api/client-fetch';
import PosterBaseView from '../';
import { BasePosterResponse, getHubblePosters } from '../../../api';
import OverlayHubble from './components/OverlayHubble';

export default function PosterHubbleView() {
  return (
    <PosterBaseView
      overlay={OverlayHubble}
      getPosters={getHubblePosters as unknown as () => Promise<RequestResult<BasePosterResponse>>}
    />
  );
}
