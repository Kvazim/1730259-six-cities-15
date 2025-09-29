import { memo, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { MemoizedMap, MemoizedNearPlaces, MemoizedOfferReviewPanel, MemoizedPlacesDetails } from '../../widgest';
import { useParams } from 'react-router-dom';
import { AuthorizationStatus, LOADING_STATUSES } from '../../shared/lib/const/const';
import LoadingScreen from '../../shared/ui/loading-screen/loading-screen';
import { getDataToMap } from '../../shared/lib/utils/utils';
import { Offer, OfferMapItem, OfferMapItems } from '../../shared/types/offers';
import { authStatus, selectNear, selectNearSlice, selectPlacesById, selectReviewsById } from '../../entities';
import { useAppDispatch, useAppSelector } from '../../shared/lib/redux';
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

  const isLoading = useMemo(() => (
    LOADING_STATUSES.has(offerStatus) ||
    LOADING_STATUSES.has(reviewsStatus) ||
    LOADING_STATUSES.has(nearStatus)
  ), [offerStatus, reviewsStatus, nearStatus]);

  if (isLoading) {
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
      <MemoizedNearPlaces isAuth={isAuth} />
    </main>
  );
}

const MemoizedOfferPage = memo(OfferPage);

export { MemoizedOfferPage };
