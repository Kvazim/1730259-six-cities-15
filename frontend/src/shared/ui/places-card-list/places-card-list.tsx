import { memo } from 'react';
import { Offers } from '../../types/offers';
import MemoizedPlaceCard from '../place-card/place-card';
import { DEFAULT_ZERO } from '../../lib/const/const';

type PlacesCardListProps = {
  offers?: Offers;
  className: string;
  cardClassName: string;
  onMouseEvent?: (id: string | null) => void;
}

export function PlacesCardList({offers, className, cardClassName, onMouseEvent}: PlacesCardListProps) {
  return (
    <div className={className}>
      {
        offers &&
        Array.isArray(offers) &&
        offers.length > DEFAULT_ZERO &&
        offers.map(
          (offer) =>(
            <MemoizedPlaceCard
              key={offer.id}
              offer={offer}
              onMouseEvent={onMouseEvent}
              className={cardClassName}
            />
          )
        )
      }
    </div>
  );
}

const MemoizedPlacesCardList = memo(PlacesCardList);

export { MemoizedPlacesCardList };
