import Premium from '../premium/premium';
import MemoizedFavoritButton from '../favorit-button/favorit-button';
import MemoizedRaitingStars from '../raiting-stars/raiting-stars';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offers';
import { capitalize, mouseEvents } from '../../utils/utils';
import { memo } from 'react';
import { useAppDispatch } from '../../hooks';
import { MyLocation } from '../../types/my-location';
import { setCurrentOfferId } from '../../store/offer-process/offer-process.slice';

type PlaceCardProps ={
  className: string;
  offer: Offer;
  isSmall?: boolean;
}

function PlaceCard({className, offer, isSmall}: PlaceCardProps): JSX.Element {
  const {id, isPremium, previewImage, price, isFavorite, rating, title, type} = offer;
  const {pathname} = useLocation() as MyLocation;
  const dispatch = useAppDispatch();

  const handleMouseEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    if (pathname === AppRoute.Root) {
      dispatch(setCurrentOfferId(mouseEvents[event.type as keyof typeof mouseEvents](id)));
    }
  };

  const cardURL = `${AppRoute.Offer}${id}`;

  return (
    <article
      className={`${className}__card place-card`}
      onMouseEnter={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
    >
      {isPremium ? <Premium className={'place-card__mark'} /> : null}

      <div
        className={`${className}__image-wrapper place-card__image-wrapper`}
      >
        <Link to={cardURL}>
          <img className="place-card__image" src={previewImage} width={isSmall ? '150' : '260'} height={isSmall ? '110' : '200'} alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <MemoizedFavoritButton className='place-card' iconWidth='18' iconHeight='19' isFavorite={isFavorite} id={id} />
        </div>
        <div className="place-card__rating rating">
          <MemoizedRaitingStars className='place-card__stars' rating={rating} />
        </div>
        <h2 className="place-card__name">
          <Link to={cardURL}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

const MemoizedPlaceCard = memo(PlaceCard);

export default MemoizedPlaceCard;
