import './index.scss'
import { useEffect, useState } from 'react';
import { LoadingView } from '@gewis/aurora-client-theme';
import { getRoomResponsibleLegacyUrl } from '@gewis/aurora-client-api';
import { HandlerComponent } from '@gewis/aurora-client-util';
import Logo from '../assets/helmet-white.svg?react';

export const RoomResponsibleLegacyView: HandlerComponent = () => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    getRoomResponsibleLegacyUrl()
      .then((res) => {
        if (res && res.data) setUrl(res.data);
      })
      .catch((e) => console.error(e));
  }, []);

  if (!url) {
    return (
      <LoadingView>
        <h1>Fetching url...</h1>
      </LoadingView>
    );
  }

  return (
    <div className="h-screen w-screen bg-black">
      <iframe src={url} title="Room Responsible Legacy" className="w-full h-full border-0" />
      <div className="absolute bottom-0 right-0 p-5 overflow-hidden">
        <Logo className="w-[150px] h-auto"/>
      </div>
    </div>
  );
};
