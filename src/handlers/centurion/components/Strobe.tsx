import styles from '../centurion.module.css';
import { clsx } from 'clsx';
import React from 'react';

interface Props {
  hornCount: number;
}

export default function Strobe({ hornCount }: Props) {
  return (
    <div className={clsx('h-screen flex items-center justify-center w-full top-0 left-0 absolute z-20', styles.strobe)} >
      <p className='text-gray-500 text-[800px]'>
        {hornCount}
      </p>
    </div>
  );
}