import HelmetDark from '../../../assets/helmet-black.svg?react';
import HelmetLight from '../../../assets/helmet-white.svg?react';

interface Props {
  variant: 'left' | 'right';
  size: string | number;
  dark?: boolean;
}

export function LogoLine({ variant, size, dark }: Props) {
  const renderHelmet = () => {
    const scaledSize = `calc(${size} * 3)`;
    if (dark) return <HelmetDark width={scaledSize} className="h-auto"/>;
    return <HelmetLight width={scaledSize} className="h-auto"/>;
  };

  return (
    <div className="flex flex-row items-center font-raleway">
      {variant === 'left' && renderHelmet()}
      <div className={'flex flex-col ' + (variant === 'left' ? 'items-start' : 'items-end')}>
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
      {variant === 'right' && renderHelmet()}
    </div>
  );
}
