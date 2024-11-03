import { clsx } from 'clsx';
import styles from '../centurion.module.css';

interface Props {
  albumCover: string;
  title: string;
  description: string;
}

export default function Information(props: Props) {
  const { albumCover, title, description } = props;

  return (
    <div className={clsx('h-screen flex items-center justify-center z-10 drop-shadow-xl', styles.displayText)}>
      <img alt="albumCover" className="h-1/2 mr-6" src={albumCover} />
      <div className="w-fit max-w-4xl flex flex-col justify-center">
        <p className="text-white text-7xl p-4 font-bold">{title}</p>
        <p className="text-white text-7xl p-4 font-semibold">{description.toUpperCase()}</p>
      </div>
    </div>
  );
}
