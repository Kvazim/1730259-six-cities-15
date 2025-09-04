import { memo, ReactNode } from 'react';
import { authStatus, MemoizedOfferReviews } from '../../entities';
import { MemoizedPlaces } from '../../entities';
import { useAppSelector } from '../../shared/lib/redux';
import { AuthorizationStatus } from '../../shared/lib/const/const';
import { MemoizedReviewsForm } from '../../features';

type PlacesDetailsProps = {
  children?: ReactNode;
};

function PlacesDetails({children}: PlacesDetailsProps) {
  const authorizationStatus = useAppSelector(authStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <section className="offer">
      <MemoizedPlaces>
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
