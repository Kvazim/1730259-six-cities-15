import { memo } from 'react';
import { Offers } from '../../types/offers';
import MemoizedPlaceCard from '../place-card/place-card';

type PlacesCardListProps = {
  offers: Offers;
  onMouseEvent?: (id: string | null) => void;
}

export function PlacesCardList({offers, onMouseEvent}: PlacesCardListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => <MemoizedPlaceCard key={offer.id} offer={offer} onMouseEvent={onMouseEvent} className='cities' />)
      }
    </div>
  );
}

const MemoizedPlacesCardList = memo(PlacesCardList);

export { MemoizedPlacesCardList };
