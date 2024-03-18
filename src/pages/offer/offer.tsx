import { Helmet } from 'react-helmet-async';
import Map from '../../components/map/map';
import PlaceCard from '../../components/place-card/place-card';
import Premium from '../../components/premium/premium';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import OfferReviews from '../../components/offer-reviews/offer-reviews';
import OfferHost from '../../components/offer-host/offer-host';
import MemoizedOfferGalery from '../../components/offer-galery/offer-galery';
import OfferInside from '../../components/offer-inside/offer-inside';
import OfferPrice from '../../components/offer-price/offer-price';
import OfferFeatures from '../../components/offer-features/offer-features';
import OfferRating from '../../components/offer-rating/offer-rating';
import OfferName from '../../components/offer-name/offer-name';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { getCurrentOffer } from '../../store/action';
import { fetchNearbyOffersAction, fetchOfferIdAction, fetchOfferReviewsAction } from '../../store/api-actions';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { getDataToMap } from '../../utils/utils';

function Offer(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.isDataLoading);
  const offer = useAppSelector((state) => state.fullOffer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers).slice(0, 3);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(getCurrentOffer(id));
    dispatch(fetchOfferIdAction(id));
    dispatch(fetchOfferReviewsAction(id));
    dispatch(fetchNearbyOffersAction(id));

  },[dispatch, id]);

  if (isLoading) {
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

  const mapItems = getDataToMap(nearbyOffers).concat({id: offer.id, city: offer.city, location: offer.location});

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <section className="offer">
        <MemoizedOfferGalery images={images} />
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium && <Premium className='offer__mark' />}
            <OfferName id={id || ''} title={title} isFavorite={isFavorite} />
            <OfferRating rating={rating} />
            <OfferFeatures type={type} bedrooms={bedrooms} maxAdults={maxAdults} />
            <OfferPrice price={price} />
            <OfferInside goods={goods} />
            <OfferHost host={host} description={description} />
            <OfferReviews id={id || ''} />
          </div>
        </div>
        <Map className='offer' offers={mapItems} />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {
              nearbyOffers.length > 0 &&
              nearbyOffers.map(
                (nearbyOffer) => <PlaceCard key={nearbyOffer.id} className='near-places' offer={nearbyOffer} />
              )
            }
          </div>
        </section>
      </div>
    </main>
  );
}

export default Offer;
