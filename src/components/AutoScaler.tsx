import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getOwnScreen, ScreenResponse } from '../api';

const DEFAULT_FONT_SIZE = 16;

export default function AutoScaler() {
  const { user } = useContext(AuthContext);

  const [screen, setScreen] = useState<ScreenResponse | null>(null);

  useEffect(() => {
    if (!user) return;

    getOwnScreen()
      .then((res) => {
        if (res.response.ok && res.data) {
          setScreen(res.data);
        }
      })
      .catch(console.error);
  }, [user]);

  useEffect(() => {
    if (screen) {
      document.documentElement.style.fontSize = Math.round(DEFAULT_FONT_SIZE * screen.scaleFactor) + 'px';
    }
  }, [screen]);

  return null;
}
