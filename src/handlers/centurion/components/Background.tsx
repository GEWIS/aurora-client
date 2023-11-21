import styles from '../centurion.module.css';
import { clsx } from 'clsx';
import React from 'react';
import { Helmet } from 'react-helmet';
import { usePrevious } from '../../../helpers/usePrevious';
import { CurrentColors } from '../index';
import { imports, tweenMax } from '../scripts/imports';
import { lavalampFragment, lavalampJavascript, lavalampVertex } from '../scripts/lavalamp';

interface Props {
  colors: CurrentColors
}

export default function Background({ colors }: Props) {
  const previous = usePrevious(colors);

  return (
    <div className="h-screen w-full top-0 left-0 absolute -z-20" >
      <Helmet>
        <script type="text/javascript">{imports()}</script>
        <script type="text/javascript">{tweenMax()}</script>
        <script type="text/javascript">{lavalampJavascript(colors.start, colors.end)}</script>
        <script type="x-shader/x-vertex" id="vertexMetaballs">{lavalampVertex()}</script>
        <script type="x-shader/x-fragment" id="fragmentMetaballs">{lavalampFragment()}</script>
      </Helmet>

      <div
        className={clsx(styles.fullscreen, styles.wallpaper, '-z-20')}
        style={{
          ['--start-color-animation' as any]: colors.end,
          ['--end-color-animation' as any]: colors.start,
        }}
      >
        <canvas id="lavalamp-canvas" className={clsx(styles.fullscreen)}></canvas>
      </div>
    </div>
  );
}