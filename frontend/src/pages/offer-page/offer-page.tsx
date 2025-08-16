import { Helmet } from 'react-helmet-async';
import MemoizedMap from '../../components/map/map';
import MemoizedPlaceCard from '../../components/place-card/place-card';
import MemoizedPremium from '../../components/premium/premium';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute, DEFAULT_ZERO, MAX_NIAR_OFFER, Status } from '../../const';
import MemoizedOfferReviews from '../../components/offer-reviews/offer-reviews';
import MemoizedOfferHost from '../../components/offer-host/offer-host';
import MemoizedOfferGalery from '../../components/offer-galery/offer-galery';
import MemoizedOfferInside from '../../components/offer-inside/offer-inside';
import MemoizedOfferPrice from '../../components/offer-price/offer-price';
import MemoizedOfferFeatures from '../../components/offer-features/offer-features';
import MemoizedOfferRating from '../../components/offer-rating/offer-rating';
import MemoizedOfferName from '../../components/offer-name/offer-name';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { memo, useEffect } from 'react';
import { fetchNearByOffersAction, fetchOfferIdAction, fetchOfferReviewsAction } from '../../store/api-actions';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { getDataToMap } from '../../utils/utils';
import { getFullOffer, getFullOfferLoadingStatus, getNearByOffers, getNearByOffersLoadingStatus } from '../../store/offer-process/offer-process.selectors';
import { setCurrentOfferId } from '../../store/offer-process/offer-process.slice';
import { getReviewsLoadingStatus } from '../../store/review-process/review-process.selectors';
import { Offer } from '../../types/offers';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: Offer['id'] }>();
  const dispatch = useAppDispatch();
  const isLoadingFullOffer = useAppSelector(getFullOfferLoadingStatus);
  const isLoadingNearByOffers = useAppSelector(getNearByOffersLoadingStatus);
  const isReviewLoading = useAppSelector(getReviewsLoadingStatus);
  const offer = useAppSelector(getFullOffer);
  const nearByOffers = useAppSelector(getNearByOffers).slice(DEFAULT_ZERO, MAX_NIAR_OFFER);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(setCurrentOfferId(id));
    dispatch(fetchOfferIdAction(id));
    dispatch(fetchOfferReviewsAction(id));
    dispatch(fetchNearByOffersAction(id));
  },[dispatch, id]);

  if (
    (isLoadingFullOffer === Status.Idle || isLoadingFullOffer === Status.Loading) ||
    (isReviewLoading === Status.Idle || isReviewLoading === Status.Loading) ||
    (isLoadingNearByOffers === Status.Idle || isLoadingNearByOffers === Status.Loading)
  ) {
    return <LoadingScreen />;
  }

  if (!offer) {
    return <Navigate to={AppRoute.PageNotFound} replace />;
  }

  const {
    images, isPremium, title,
    isFavorite, rating, type,
    bedrooms, maxAdults, price,
    goods, host, description,
  } = offer;

  const mapItems = getDataToMap(nearByOffers).concat({id: offer.id, city: offer.city, location: offer.location});

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <section className="offer">
        <MemoizedOfferGalery images={images} />
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium && <MemoizedPremium className='offer__mark' />}
            {id && <MemoizedOfferName id={id} title={title} isFavorite={isFavorite} />}
            <MemoizedOfferRating rating={rating} />
            <MemoizedOfferFeatures type={type} bedrooms={bedrooms} maxAdults={maxAdults} />
            <MemoizedOfferPrice price={price} />
            <MemoizedOfferInside goods={goods} />
            <MemoizedOfferHost host={host} description={description} />
            {id && <MemoizedOfferReviews id={id} />}
          </div>
        </div>
        <MemoizedMap className='offer' offers={mapItems} />
      </section>
      <div className="container">
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
      </div>
    </main>
  );
}

const MemoizedOfferPage = memo(OfferPage);

export default MemoizedOfferPage;
