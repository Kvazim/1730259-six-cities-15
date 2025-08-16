import { memo } from 'react';
import { City, Offers } from '../../types/offers';
import MemoizedLocationItem from '../location-item/location-item';
import MemoizedPlaceCard from '../place-card/place-card';
import { decapitalize } from '../../utils/utils';
import { Cities } from '../../const';

type FavoritesListProps = {
  favoriteOffers: Offers;
}

function FavoritesList({favoriteOffers}:FavoritesListProps): JSX.Element {
  const favoritLocations = new Map<City['name'], Offers>();

  favoriteOffers.forEach((offer) => {
    const cityName = decapitalize(offer.city.name) as keyof typeof Cities;
    if (favoritLocations.has(cityName)) {
      favoritLocations.get(cityName)?.push(offer);
    } else {
      favoritLocations.set(cityName, [offer]);
    }
  });

  return (
    <ul className="favorites__list">
      {
        Array.from(favoritLocations.keys()).map((city) => (
          <li key={String(city)} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <MemoizedLocationItem city={city} />
            </div>
            <div className="favorites__places">
              {
                favoritLocations.get(city)
                  ?.map((offer) => <MemoizedPlaceCard key={offer.id} className='favorites' offer={offer} isSmall />)
              }
            </div>
          </li>
        ))
      }
    </ul>
  );
}

const MemoizedFavoritesList = memo(FavoritesList);

export default MemoizedFavoritesList;
