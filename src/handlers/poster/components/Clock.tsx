import { useEffect, useState } from 'react';

export default function Clock() {
  const [hours, setHours] = useState<number | undefined>();
  const [minutes, setMinutes] = useState<number | undefined>();
  const [tick, setTick] = useState(true);

  const setTime = () => {
    const now = new Date();
    setHours(now.getHours());
    setMinutes(now.getMinutes());

    setTick((t) => !t);
  };

  useEffect(() => {
    const interval = setInterval(setTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="inline-flex flex-row flex-nowrap w-auto text-shadow" style={{ fontFamily: '"Lato", monospace' }}>
      <div>{hours?.toString().padStart(2, '0') ?? '--'}</div>
      <div className="w-3 text-center">{tick ? ':' : ''}</div>
      <div>{minutes?.toString().padStart(2, '0') ?? '--'}</div>
    </div>
  );
}
