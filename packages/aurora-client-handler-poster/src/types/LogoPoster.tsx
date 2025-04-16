import GEWISLogo from '../../assets/base/gewis-color.svg?react'
import wallPaper from '../../assets/base/poster-background.png'

export default function LogoPoster() {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full
      flex flex-col justify-center items-center
      overflow-hidden bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${wallPaper})` }}
    >
      <div className="w-1/3 h-full flex flex-col justify-center items-center">
        <GEWISLogo className="gewis-logo" />
      </div>
      <div className="progress-bar-height flex-1" />
    </div>
  );
}
