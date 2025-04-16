import './index.scss'
import { useEffect, useState } from 'react';
import {getSpotifyCurrentlyPlaying, TrackChangeEvent} from '@gewis/aurora-client-api';
import { HandlerComponent } from '@gewis/aurora-client-util';
import BlurredImage from './components/BlurredImage';

export const SpotifyView: HandlerComponent = ({ socket }) => {
  const [albumCover, setAlbumCover] = useState<string | undefined>();
  const [artist, setArtists] = useState<string | undefined>();
  const [song, setSong] = useState<string | undefined>();

  const handleTrackChange = (trackChangeEvent: TrackChangeEvent[]) => {
    setArtists(trackChangeEvent[0].artists.join(', '));
    setSong(trackChangeEvent[0].title);
    setAlbumCover(trackChangeEvent[0].cover);
  };

  useEffect(() => {
    // TODO what to display when no data is fetched?
    getSpotifyCurrentlyPlaying()
      .then((res) => {
        if (res.data) {
          setArtists(res.data[0].artists.join(', '));
          setSong(res.data[0].title);
          setAlbumCover(res.data[0].cover);
        } else {
          setSong("Aurora - Study Association GEWIS")
          setArtists("No track playing")
          // TODO replace with other cover
          setAlbumCover("https://i1.sndcdn.com/avatars-000673222937-z81nb7-t200x200.jpg")
        }

        handleTrackChange(res.data!)
      })
      .catch((e) => console.error(e));

    socket.on('change_track', (event: unknown[]) => {
      const trackChangeEvents = event[0] as TrackChangeEvent[];
      handleTrackChange(trackChangeEvents);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);

  return (
    <div className="relative">
      {albumCover && <BlurredImage cover={albumCover} />}
      <div className="h-screen flex items-center justify-center relative">
        <img alt="albumCover" className="h-1/2 mr-6" src={albumCover} />
        <div className="w-xl flex flex-col justify-center font-raleway">
          <p className="text-white text-6xl p-4 font-semibold">
            {song}
          </p>
          <p className="text-white text-5xl p-4 font-bold italic ">
            {artist}
          </p>
        </div>
      </div>
    </div>
  );
};
