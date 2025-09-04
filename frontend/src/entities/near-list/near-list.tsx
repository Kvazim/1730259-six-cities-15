import { memo } from 'react';
import { PlacesCardList } from '../../shared/ui/places-card-list/places-card-list';
import { useAppSelector } from '../../shared/lib/redux';
import { useParams } from 'react-router-dom';
import { Offer } from '../../shared/types/offers';
import { selectNearSlice } from './model';

function NearList() {
  const { id } = useParams<{ id: Offer['id'] }>();
  const offers = useAppSelector(selectNearSlice(id!));

  return (
    <PlacesCardList
      offers={offers}
      className='near-places__list places__list'
      cardClassName='near-places'
    />
  );
}

const MemoizedNearList = memo(NearList);

export {MemoizedNearList};
