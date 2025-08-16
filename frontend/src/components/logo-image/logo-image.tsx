import { memo } from 'react';

type LogoImageProps = {
  classImage: string;
  imageWidth: string;
  imageHeight: string;
}

function LogoImage({classImage, imageWidth, imageHeight}: LogoImageProps): JSX.Element {
  return (
    <img
      className={classImage}
      src="img/logo.svg"
      alt="6 cities logo"
      width={imageWidth}
      height={imageHeight}
    />
  );
}

const MemoizedLogoImage = memo(LogoImage);

export default MemoizedLogoImage;
