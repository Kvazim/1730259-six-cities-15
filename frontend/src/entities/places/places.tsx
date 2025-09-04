import { memo, ReactNode } from 'react';
import MemoizedOfferFeatures from '../../shared/ui/offer-features/offer-features';
import MemoizedOfferGalery from '../../shared/ui/offer-galery/offer-galery';
import MemoizedOfferHost from '../../shared/ui/offer-host/offer-host';
import MemoizedOfferInside from '../../shared/ui/offer-inside/offer-inside';
import MemoizedOfferName from '../../shared/ui/offer-name/offer-name';
import MemoizedOfferPrice from '../../shared/ui/offer-price/offer-price';
import MemoizedOfferRating from '../../shared/ui/offer-rating/offer-rating';
import MemoizedPremium from '../../shared/ui/premium/premium';
import { useAppSelector } from '../../shared/lib/redux';
import { selectPlacesById } from './model';
import { Navigate, useParams } from 'react-router-dom';
import { Offer } from '../../shared/types/offers';
import { AppRoute } from '../../shared/lib/const/const';

type PlacesProps = {
  children?: ReactNode;
}

function Places({children}: PlacesProps) {
  const { id } = useParams<{ id: Offer['id'] }>();

  const {data: fullOffer } = useAppSelector(selectPlacesById(id!));

  if (!fullOffer) {
    return <Navigate to={AppRoute.PageNotFound} replace />;
  }

  const {
    images, isPremium, title,
    isFavorite, rating, type,
    bedrooms, maxAdults, price,
    goods, host, description,
  } = fullOffer;

  return (
    <>
      <MemoizedOfferGalery images={images} />
      <div className="offer__container container">
        <div className="offer__wrapper">
          {isPremium && <MemoizedPremium className='offer__mark' />}
          <MemoizedOfferName id={id!} title={title} isFavorite={isFavorite} />
          <MemoizedOfferRating rating={rating} />
          <MemoizedOfferFeatures type={type} bedrooms={bedrooms} maxAdults={maxAdults} />
          <MemoizedOfferPrice price={price} />
          <MemoizedOfferInside goods={goods} />
          <MemoizedOfferHost host={host} description={description} />
          {children}
        </div>
      </div>
    </>
  );
}

const MemoizedPlaces = memo(Places);

export { MemoizedPlaces };
