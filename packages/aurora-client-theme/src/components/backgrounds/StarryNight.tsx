import './starryNight.scss'
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  backgroundColor?: string;
  hideStars?: boolean;
}

export function StarryNight({ children, backgroundColor, hideStars }: Props) {
  const bgColor = backgroundColor ?? '#1B2735';

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at bottom, ${bgColor} 0%, #090A0F 100%)`,
      }}
    >
      {!hideStars && <div id="stars1" />}
      {!hideStars && <div id="stars2" />}
      {!hideStars && <div id="stars3" />}
      {children}
    </div>
  );
}
