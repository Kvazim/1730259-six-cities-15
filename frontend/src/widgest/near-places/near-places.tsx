import { memo } from 'react';
import { MemoizedNearList } from '../../entities';
import { MemoizedToggleFavoriteButton } from '../../features';

type NearPlacesProps = {
  isAuth: boolean;
}

function NearPlaces({isAuth}: NearPlacesProps) {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          <MemoizedNearList
            buttonSlot={({ isFavorite, id }) => (
              <MemoizedToggleFavoriteButton
                className='place-card'
                iconWidth='18'
                iconHeight='19'
                isFavorite={isFavorite}
                id={id}
                isAuthorized={isAuth}
              />
            )}
          />
        </div>
      </section>
    </div>
  );
}

const MemoizedNearPlaces = memo(NearPlaces);

export {MemoizedNearPlaces};
