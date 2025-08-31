import { memo } from 'react';
import { capitalize } from '../../shared/lib/utils/utils';
import { DEFAULT_ONE } from '../../shared/lib/const/const';
import { useAppSelector } from '../../shared/lib/redux';
import { selectFilteredPlaces } from '../places-list';
import { getCurrentCity } from '../../entities';

function PlacesFound () {
  const places = useAppSelector(selectFilteredPlaces);
  const city = useAppSelector(getCurrentCity);
  const count = places.length;

  return (
    <b className="places__found">
      {count} {count > DEFAULT_ONE ? 'places' : 'place'} to stay in {capitalize(city)}
    </b>
  );
}

const MemoizedPlacesFound = memo(PlacesFound);

export { MemoizedPlacesFound };
