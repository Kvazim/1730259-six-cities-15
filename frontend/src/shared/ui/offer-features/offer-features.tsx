import { memo } from 'react';
import { DEFAULT_ONE } from '../../lib/const/const';
import { capitalize } from '../../lib/utils/utils';
import { ApartmentType } from '../../types/offers';

type OfferFeaturesProps = {
  type: ApartmentType;
  bedrooms: number;
  maxAdults: number;
}

function OfferFeatures({type, bedrooms, maxAdults}: OfferFeaturesProps): JSX.Element {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">
        {capitalize(type)}
      </li>
      <li className="offer__feature offer__feature--bedrooms">
        {bedrooms} {bedrooms > DEFAULT_ONE ? 'Bedrooms' : 'Bedroom'}
      </li>
      <li className="offer__feature offer__feature--adults">
      Max {maxAdults} {maxAdults > DEFAULT_ONE ? 'adults' : 'adult'}
      </li>
    </ul>
  );
}

const MemoizedOfferFeatures = memo(OfferFeatures);

export default MemoizedOfferFeatures;
