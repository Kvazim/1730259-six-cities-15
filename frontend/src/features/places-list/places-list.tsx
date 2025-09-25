import { memo } from 'react';
import { MemoizedPlacesCardList } from '../../shared/ui/places-card-list/places-card-list';
import { setCurrentOffer } from './model';
import { useAppDispatch, useAppSelector } from '../../shared/lib/redux';
import { selectSortingPlaces } from './model';
import { OfferMapItem } from '../../shared/types/offers';


function PlacesList() {
  const dispatch = useAppDispatch();
  const selectSortedPlaces = useAppSelector(selectSortingPlaces);

  const handleMouseEvent = (data: OfferMapItem | null) => {
    dispatch(setCurrentOffer(data));
  };

  return (
    <MemoizedPlacesCardList
      offers={selectSortedPlaces}
      className='cities__places-list places__list tabs__content'
      cardClassName='cities'
      onMouseEvent={handleMouseEvent}
    />
  );
}

const MemoizedPlacesList = memo(PlacesList);

export { MemoizedPlacesList };
