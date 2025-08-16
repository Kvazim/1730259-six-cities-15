import { memo } from 'react';
import { Offer } from '../../types/offers';
import MemoizedFavoritButton from '../favorit-button/favorit-button';

type OfferNameProps = {
  title: string;
  id: Offer['id'];
  isFavorite: boolean;
}

function OfferName({title, isFavorite, id}: OfferNameProps): JSX.Element {
  return (
    <div className="offer__name-wrapper">
      <h1 className="offer__name">
        {title}
      </h1>
      <MemoizedFavoritButton className='offer' iconWidth='31' iconHeight='33' isFavorite={isFavorite} id={id} />
    </div>
  );
}

const MemoizedOfferName = memo(OfferName);

export default MemoizedOfferName;
