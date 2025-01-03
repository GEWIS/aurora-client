import { useEffect, useState } from 'react';

interface Props {
  color: string;
}

export default function Clock({ color }: Props) {
  const [hours, setHours] = useState<number | undefined>();
  const [minutes, setMinutes] = useState<number | undefined>();

  const setTime = () => {
    const now = new Date();
    setHours(now.getHours());
    setMinutes(now.getMinutes());
  };

  useEffect(() => {
    const interval = setInterval(setTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="inline-flex flex-row flex-nowrap w-auto h-full items-center"
      style={{ fontFamily: '"Lato", monospace', fontSize: '8vh', color: color }}
    >
      <div>{hours?.toString().padStart(2, '0') ?? '--'}</div>
      <div className="w-full text-center" style={{ width: '=10%' }}>
        :
      </div>
      <div>{minutes?.toString().padStart(2, '0') ?? '--'}</div>
    </div>
  );
}
