import Premium from '../premium/premium';
import FavoritButton from '../favorit-button/favorit-button';
import RaitingStars from '../raiting-stars/raiting-stars';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offers';
import { capitalize } from '../../utils/utils';

type PlaceCardProps ={
  className: string;
  offer: Offer;
  onCardHover?: (offerId: Offer['id'] | null) => void;
  isSmall?: boolean;
}

function PlaceCard({className, offer, onCardHover, isSmall}: PlaceCardProps): JSX.Element {
  const {id, isPremium, previewImage, price, isFavorite, rating, title, type} = offer;

  function handleMouseEnter () {
    onCardHover?.(id);
  }

  function handleMouseLeave () {
    onCardHover?.(null);
  }

  return (
    <article
      className={`${className}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium ? <Premium className={'place-card__mark'} /> : null}

      <div
        className={`${className}__image-wrapper place-card__image-wrapper`}
      >
        <Link to={`${AppRoute.Offer}${id}`}>
          <img className="place-card__image" src={previewImage} width={isSmall ? '150' : '260'} height={isSmall ? '110' : '200'} alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoritButton className='place-card' iconWidth='18' iconHeight='19' isFavorite={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <RaitingStars className='place-card__stars' rating={rating} />
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
