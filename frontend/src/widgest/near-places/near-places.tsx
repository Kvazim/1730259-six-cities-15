import { memo } from 'react';
import { MemoizedNearList } from '../../entities';

function NearPlaces() {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          <MemoizedNearList />
        </div>
      </section>
    </div>
  );
}

const MemoizedNearPlaces = memo(NearPlaces);

export {MemoizedNearPlaces};
