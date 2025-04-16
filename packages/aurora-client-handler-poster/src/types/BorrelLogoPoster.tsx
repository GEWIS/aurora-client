import SudoSOSLogo from '../../assets/borrel/sudosos.svg?react';
import wallPaper from "../../assets/borrel/bac-background.png";
import './borrel.scss'

export default function BorrelLogoPoster() {
  return (
    <div
      className="w-full h-full
      flex flex-col justify-center items-center gap-8
      bg-cover text-shadow
      text-white text-8xl pb-10"
      style={{
        background: `url("${wallPaper}")`,
        textShadow: '0 0 32px black'
      }}
    >
      <div className="font-extrabold" style={{ fontFamily: 'CrayonCrumble' }}>
        This borrel is powered by
      </div>
      <div className="h-1/2">
        <SudoSOSLogo className="h-full" style={{ filter: 'drop-shadow(0 0px 10px rgba(0, 0, 0, 0.4))' }} />
      </div>
      <div className="text-9xl" style={{ fontFamily: 'Raleway' }}>
        SudoSOS
      </div>
    </div>
  );
}
