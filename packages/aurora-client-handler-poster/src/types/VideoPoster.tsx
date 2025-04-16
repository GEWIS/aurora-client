import { useEffect, useRef } from 'react';

interface Props {
  source: string | string[];
  visible: boolean;
}

export default function VideoPoster({ source, visible }: Props) {
  let sourceUrl: string;
  if (Array.isArray(source)) {
    const index = Math.floor(Math.random() * source.length);
    sourceUrl = source[index];
  } else {
    sourceUrl = source;
  }

  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!visible || !ref || !ref.current) return;
    ref.current.play().catch(console.error);
  }, [visible]);

  return (
    <video className="w-full h-full" muted loop ref={ref} controls={false}>
      <source src={sourceUrl} type="video/mp4" />
    </video>
  );
}
