import { Gif } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import React, { useState } from 'react';

export { default as LoadingView } from './LoadingView';
export { default as ReloadCountdown } from './ReloadCountdown';

export default function View() {
  const [gif, setGif] = useState(null);

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const renderGIF = () => {
    if (gif) {
      return <Gif gif={gif} width={500} />;
    }
    return <h1> No GIF available </h1>;
  };

  React.useEffect(() => {
    async function fetchGif() {
      const gf = new GiphyFetch('vvf1zwtPmyFS2SXmd6jRijP4tfdGLsmZ');
      return gf.random({ tag: 'no connection', offset: getRandomInt(4999), rating: 'pg-13' });
    }

    fetchGif().then(({ data }) => setGif(data));
  }, []);

  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-red-600 sm:text-5xl">PANIEK</p>
          <h1 className="mt-4 text-3xl tracking-tight text-gray-900 sm:text-5xl">NO HANDLER SET</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Go to the backoffice to set a handler for this screen.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">{renderGIF()}</div>
        </div>
      </main>
    </>
  );
}
