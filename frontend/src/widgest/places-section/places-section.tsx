import { memo } from 'react';
import { MemoizedPlacesSorting, MemoizedPlacesFound, MemoizedPlacesList } from '../../features';

function PlacesSection() {
  return(
    <>
      <h2 className="visually-hidden">Places</h2>
      <MemoizedPlacesFound />
      <MemoizedPlacesSorting />
      <MemoizedPlacesList />
    </>
  );
}

const MemoizedPlacesSection = memo(PlacesSection);

export { MemoizedPlacesSection };
