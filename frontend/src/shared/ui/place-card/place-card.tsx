import Premium from '../premium/premium';
import MemoizedFavoritButton from '../favorit-button/favorit-button';
import MemoizedRaitingStars from '../raiting-stars/raiting-stars';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../lib/const/const';
import { memo } from 'react';
import { Offer, OfferMapItem } from '../../types/offers';
import { capitalize, getDataToMap, mouseEvents } from '../../lib/utils/utils';

type PlaceCardProps ={
  className: string;
  offer: Offer;
  isSmall?: boolean;
  onMouseEvent?: (data: OfferMapItem | null) => void;
}

function PlaceCard({className, offer, isSmall, onMouseEvent}: PlaceCardProps): JSX.Element {
  const {id, isPremium, previewImage, price, isFavorite, rating, title, type} = offer;

  const handleMouseEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onMouseEvent) {
      onMouseEvent(mouseEvents[event.type as keyof typeof mouseEvents](getDataToMap(offer) as OfferMapItem));
    }
  };

  const cardURL = `${AppRoute.Offer}${id}`;
  //TODO: разобраться с дисабоедом кнопки и обновлением статуса избранного
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
          <MemoizedFavoritButton className='place-card' iconWidth='18' iconHeight='19' isFavorite={isFavorite} isDisabled={false} handleFavoritButtonClick={()=> (console.log('click'))} />
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
