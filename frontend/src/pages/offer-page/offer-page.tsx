import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { MemoizedMap, MemoizedNearPlaces, MemoizedOfferReviewPanel, MemoizedPlacesDetails } from '../../widgest';
import { useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../shared/lib/const/const';
import LoadingScreen from '../../shared/ui/loading-screen/loading-screen';
import { getDataToMap } from '../../shared/lib/utils/utils';
import { Offer, OfferMapItem, OfferMapItems } from '../../shared/types/offers';
import { authStatus, selectNear, selectNearSlice, selectPlacesById, selectReviewsById } from '../../entities';
import { useAppDispatch, useAppSelector } from '../../shared/lib/redux';
import { QueryStatus } from '@reduxjs/toolkit/query/react';
import { setCurrentOffer } from '../../features';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: Offer['id'] }>();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(authStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const { status: offerStatus } = useAppSelector(selectPlacesById(id!));
  const { status: reviewsStatus } = useAppSelector(selectReviewsById(id!));
  const { status: nearStatus } = useAppSelector(selectNear(id!));
  const nearData = useAppSelector(selectNearSlice(id!));

  const isPendingFullOfer = offerStatus === QueryStatus.pending;
  const isIdleFullOfer = offerStatus === QueryStatus.uninitialized;
  const isPendingReviews = reviewsStatus === QueryStatus.pending;
  const isIdleReviews = reviewsStatus === QueryStatus.uninitialized;
  const isPendingRNear = nearStatus === QueryStatus.pending;
  const isIdleNear = nearStatus === QueryStatus.uninitialized;

  if (isIdleFullOfer || isPendingFullOfer || isPendingReviews || isIdleReviews || isIdleNear || isPendingRNear) {
    return <LoadingScreen />;
  }

  const handleCurrentOfferChange = (data: OfferMapItem | null) => {
    dispatch(setCurrentOffer((data)));
  };

  const mapItems = getDataToMap(nearData) as OfferMapItems;

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <section className="offer">
        <MemoizedPlacesDetails isAuth={isAuth} onCurrentOfferChange={handleCurrentOfferChange} >
          <MemoizedOfferReviewPanel isAuth={isAuth} />
        </MemoizedPlacesDetails>
        <MemoizedMap className='offer' offers={mapItems} />
      </section>
      <MemoizedNearPlaces />
    </main>
  );
}

const MemoizedOfferPage = memo(OfferPage);

export { MemoizedOfferPage };
