import { memo } from 'react';
import { MemoizedPlacesSorting, MemoizedPlacesFound, MemoizedPlacesList } from '../../features';

// Pages → Widgets, Features, Entities, Shared
// Widgets → Features, Entities, Shared
// Features → Entities, Shared
// Entities → Shared
// Shared → (только внутренние импорты)

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
