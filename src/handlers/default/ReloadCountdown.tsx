import { useEffect, useState } from 'react';

const COUNTDOWN_TIME = 10000;

export default function ReloadCountdown() {
  const [start] = useState(new Date());
  const [secondsLeft, setSecondsLeft] = useState<number>(COUNTDOWN_TIME / 1000);

  const reloadPage = () => {
    window.location.reload();
  };

  const updateSecondsLeft = () => {
    const end = new Date(start.getTime() + COUNTDOWN_TIME);
    const now = new Date();
    const msLeft = Math.max(0, end.getTime() - now.getTime());
    setSecondsLeft(Math.ceil(msLeft / 1000));
  };

  useEffect(() => {
    const reloadTimeout = setTimeout(reloadPage, COUNTDOWN_TIME);
    const renderInterval = setInterval(updateSecondsLeft, 100);
    return () => clearTimeout(reloadTimeout);
  }, []);

  return (
    <p>
      Reloading in{' '}
      <span style={{ fontFamily: 'monospace' }}>{secondsLeft.toFixed(0).padStart(2, '0')}s</span>
    </p>
  );
}
