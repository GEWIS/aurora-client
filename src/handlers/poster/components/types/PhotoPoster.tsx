import { PhotoPoster as IPhotoPoster, GEWISPhotoAlbumParams, getPhoto } from '../../../../api';
import { useEffect, useState } from 'react';
import ImagePoster from './ImagePoster';

interface Props {
  poster: IPhotoPoster;
  visible: boolean;
  setTitle: (title: string) => void;
}

export default function PhotoPoster({ poster, visible, setTitle }: Props) {
  const [url, setUrl] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (visible) setTitle(label);
  }, [visible]);

  useEffect(() => {
    const body: GEWISPhotoAlbumParams = {
      albumIds: poster.albums
    };
    getPhoto({ body }).then((res) => {
      setUrl(res.data.url);
      setLabel(res.data.label);
    });
  }, []);

  return <ImagePoster source={url} />;
}
