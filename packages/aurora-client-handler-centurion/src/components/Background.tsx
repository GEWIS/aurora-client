import { Helmet } from 'react-helmet';
import { memo } from 'react';
import './centurion.scss';
import { imports, tweenMax } from '../helpers/imports';
import { lavalampFragment, lavalampJavascript, lavalampVertex } from '../helpers/lavalamp';

interface Props {
  colors: CurrentColors;
  /** Progression in the mix, preferably a value in [0, 100] */
  progression: number;
}

export enum Colors {
  'white' = '#cccccc',
  'blindingwhite' = '#ffffff',
  'uv' = '#7e48a2',
  'lightpink' = '#ecc9f6',
  'pink' = '#dd75ec',
  'orange' = '#f18900',
  'purple' = '#8800b6',
  'brown' = '#502626',
  'red' = '#ff0000',
  'yellow' = '#fff225',
  'lime' = '#9cff55',
  'green' = '#169300',
  'blue' = '#003a91',
  'gold' = '#d9923f',
  'rosered' = '#c91651',
  'cyan' = '#07fff7',
  'lightblue' = '#98e7ff',
}

export interface CurrentColors {
  start: Colors;
  end: Colors;
}

function Background({ colors, progression }: Props) {
  return (
    <div className="h-screen w-full top-0 left-0 absolute -z-20">
      <Helmet>
        <script type="text/javascript">{imports()}</script>
        <script type="text/javascript">{tweenMax()}</script>
        <script type="text/javascript">{lavalampJavascript(colors.start, colors.end, progression)}</script>
        <script type="x-shader/x-vertex" id="vertexMetaballs">
          {lavalampVertex()}
        </script>
        <script type="x-shader/x-fragment" id="fragmentMetaballs">
          {lavalampFragment()}
        </script>
      </Helmet>

      <div
        className={'fullscreen wallpaper -z-20'}
        style={{
          ['--start-color-animation' as string]: colors.end,
          ['--end-color-animation' as string]: colors.start,
        }}
      >
        <canvas id="lavalamp-canvas" className={'fullscreen'}></canvas>
      </div>
    </div>
  );
}

export default memo(Background);
