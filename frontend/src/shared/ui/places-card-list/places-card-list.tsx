import { memo, ReactNode } from 'react';
import { OfferMapItem, Offers } from '../../types/offers';
import MemoizedPlaceCard from '../place-card/place-card';
import { DEFAULT_ZERO } from '../../lib/const/const';

type PlacesCardListProps = {
  offers?: Offers;
  className: string;
  cardClassName: string;
  buttonSlot?: (props: { isFavorite: boolean; id: string }) => ReactNode;
  onMouseEvent?: (data: OfferMapItem | null) => void;
}

export function PlacesCardList({offers, className, cardClassName, buttonSlot, onMouseEvent}: PlacesCardListProps) {
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
              buttonSlot={buttonSlot?.({
                isFavorite: offer.isFavorite,
                id: offer.id
              })}
            />
          )
        )
      }
    </div>
  );
}

const MemoizedPlacesCardList = memo(PlacesCardList);

export { MemoizedPlacesCardList };
