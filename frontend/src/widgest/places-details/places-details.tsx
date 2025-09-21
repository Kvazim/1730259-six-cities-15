import { memo, ReactNode } from 'react';
import { authStatus, MemoizedOfferReviews } from '../../entities';
import { MemoizedPlaces } from '../../entities';
import { useAppSelector } from '../../shared/lib/redux';
import { AuthorizationStatus } from '../../shared/lib/const/const';
import { MemoizedReviewsForm, MemoizedToggleFavoriteButton } from '../../features';

type PlacesDetailsProps = {
  children?: ReactNode;
};

function PlacesDetails({children}: PlacesDetailsProps) {
  const authorizationStatus = useAppSelector(authStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <section className="offer">
      <MemoizedPlaces
        favoritButton={({ isFavorite, id }) => (
          <MemoizedToggleFavoriteButton
            className="offer"
            iconWidth="31"
            iconHeight="33"
            isFavorite={isFavorite}
            id={id}
            isAuthorized={isAuth}
          />
        )}
      >
        <MemoizedOfferReviews >
          {isAuth && <MemoizedReviewsForm />}
        </MemoizedOfferReviews>
      </MemoizedPlaces>
      {children}
    </section>
  );
}
const MemoizedPlacesDetails = memo(PlacesDetails);

export { MemoizedPlacesDetails };
