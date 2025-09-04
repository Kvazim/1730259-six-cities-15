import { Helmet } from 'react-helmet-async';
import { MemoizedMap, MemoizedPlacesDetails } from '../../widgest';
import MemoizedPlaceCard from '../../shared/ui/place-card/place-card';
import MemoizedPremium from '../../shared/ui/premium/premium';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute, DEFAULT_ZERO, MAX_NIAR_OFFER, Status } from '../../shared/lib/const/const';
import MemoizedOfferReviews from '../../entities/offer-reviews/offer-reviews';
import MemoizedOfferHost from '../../shared/ui/offer-host/offer-host';
import MemoizedOfferGalery from '../../shared/ui/offer-galery/offer-galery';
import MemoizedOfferInside from '../../shared/ui/offer-inside/offer-inside';
import MemoizedOfferPrice from '../../shared/ui/offer-price/offer-price';
import MemoizedOfferFeatures from '../../shared/ui/offer-features/offer-features';
import MemoizedOfferRating from '../../shared/ui/offer-rating/offer-rating';
import MemoizedOfferName from '../../shared/ui/offer-name/offer-name';
import { memo, useEffect } from 'react';
import { fetchNearByOffersAction, fetchOfferIdAction, fetchOfferReviewsAction } from '../../store/api-actions';
import LoadingScreen from '../../shared/ui/loading-screen/loading-screen';
import { getFullOffer, getFullOfferLoadingStatus, getNearByOffers, getNearByOffersLoadingStatus } from '../../store/offer-process/offer-process.selectors';
import { setCurrentOfferId } from '../../store/offer-process/offer-process.slice';
import { getReviewsLoadingStatus } from '../../store/review-process/review-process.selectors';
import { getDataToMap } from '../../shared/lib/utils/utils';
import { Offer } from '../../shared/types/offers';
import { selectPlacesById } from '../../entities';
import { useAppSelector } from '../../shared/lib/redux';
import { QueryStatus } from '@reduxjs/toolkit/query/react';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: Offer['id'] }>();

  const { status } = useAppSelector(selectPlacesById(id!));
  const isPendingFullOfer = status === QueryStatus.pending;
  const isIdleFullOfer = status === QueryStatus.uninitialized;
  // const dispatch = useAppDispatch();
  // const isLoadingFullOffer = useAppSelector(getFullOfferLoadingStatus);
  // const isLoadingNearByOffers = useAppSelector(getNearByOffersLoadingStatus);
  // const isReviewLoading = useAppSelector(getReviewsLoadingStatus);
  // const offer = useAppSelector(getFullOffer);
  // const nearByOffers = useAppSelector(getNearByOffers).slice(DEFAULT_ZERO, MAX_NIAR_OFFER);

  // useEffect(() => {
  //   if (!id) {
  //     return;
  //   }

  //   dispatch(setCurrentOfferId(id));
  //   dispatch(fetchOfferIdAction(id));
  //   dispatch(fetchOfferReviewsAction(id));
  //   dispatch(fetchNearByOffersAction(id));
  // },[dispatch, id]);

  if (isIdleFullOfer || isPendingFullOfer) {
    return <LoadingScreen />;
  }

  // if (
  //   (isLoadingFullOffer === Status.Idle || isLoadingFullOffer === Status.Loading) ||
  //   (isReviewLoading === Status.Idle || isReviewLoading === Status.Loading) ||
  //   (isLoadingNearByOffers === Status.Idle || isLoadingNearByOffers === Status.Loading)
  // ) {
  //   return <LoadingScreen />;
  // }

  // if (!offer) {
  //   return <Navigate to={AppRoute.PageNotFound} replace />;
  // }

  // const {
  //   images, isPremium, title,
  //   isFavorite, rating, type,
  //   bedrooms, maxAdults, price,
  //   goods, host, description,
  // } = offer;

  // const mapItems = getDataToMap(nearByOffers).concat({id: offer.id, city: offer.city, location: offer.location});

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <MemoizedPlacesDetails >
        {/* <MemoizedMap className='offer' offers={mapItems} /> */}
      </MemoizedPlacesDetails>
      {/* <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {
              nearByOffers.length > DEFAULT_ZERO &&
              nearByOffers.map(
                (nearByOffer) => <MemoizedPlaceCard key={nearByOffer.id} className='near-places' offer={nearByOffer} />
              )
            }
          </div>
        </section>
      </div> */}
    </main>
  );
}

const MemoizedOfferPage = memo(OfferPage);

export { MemoizedOfferPage };
