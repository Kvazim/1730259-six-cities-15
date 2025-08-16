import { memo } from 'react';
import { DEFAULT_ZERO, MAX_IMAGES_OFFER } from '../../const';

type OfferGaleryProps = {
  images: string[];
}

function OfferGalery({images}: OfferGaleryProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {
          images.slice(DEFAULT_ZERO, MAX_IMAGES_OFFER).map((image) => (
            <div key={String(image)} className="offer__image-wrapper">
              <img className="offer__image" src={image} alt="Photo studio" />
            </div>
          ))
        }
      </div>
    </div>
  );
}

const MemoizedOfferGalery = memo(OfferGalery);

export default MemoizedOfferGalery;
