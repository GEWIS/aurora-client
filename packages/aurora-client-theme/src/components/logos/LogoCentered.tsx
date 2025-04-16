import HelmetDark from '../../../assets/helmet-black.svg?react';
import HelmetLight from '../../../assets/helmet-white.svg?react';

interface Props {
  size: string | number;
  dark?: boolean;
}

export function LogoCentered({ size, dark }: Props) {
  const scaledSize = `calc(${size} * 5)`;
  return (
    <div className="flex flex-col items-center">
      { dark ? <HelmetDark width={scaledSize} className="h-auto"/> : <HelmetLight width={scaledSize} className="h-auto"/> }
      <span className={[!dark ? 'text-neutral-100' : 'text-black'].join(' ')} style={{ fontSize: size }}>
        Powered by Aurora
      </span>
      <span
        className={[!dark ? 'text-neutral-100' : 'text-black', 'italic'].join(' ')}
        style={{ fontSize: `calc(${size} * 0.3)` }}
      >
        Study Association GEWIS
      </span>
    </div>
  );
}
