import './centurion.scss';

interface Props {
  hornCount: number;
}

export default function Strobe({ hornCount }: Props) {
  return (
    <div
      className={'h-screen flex items-center justify-center w-full top-0 left-0 absolute z-20 overflow-hidden strobe'}
    >
      <p className="text-gray-500 text-[800px] font-raleway">{hornCount}</p>
    </div>
  );
}
