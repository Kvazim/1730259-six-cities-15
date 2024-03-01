import Map from '../../components/map/map';
import PlaceCard from '../../components/place-card/place-card';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import MemoizedTabs from '../../components/tabs/tabs';
import { useLocation, useSearchParams } from 'react-router-dom';
import { CITY, Cities, DEFAULT_CITY, DEFAULT_SORT, SORT_TYPE, SortType } from '../../const';
import { capitalize, getCurrentOffers, sortingType } from '../../utils/utils';
import { useEffect, useMemo, useState } from 'react';
import { Offer, Offers } from '../../types/offers';
import cn from 'classnames';
import MainEmpty from '../../components/main-empty/main-empty';
import { MyLocation } from '../../types/my-location';

type MainProps = {
  offers: Offers;
}

function Main({offers}: MainProps): JSX.Element {
  const [, setHoveredOfferId] = useState<Offer['id'] | null>(null);
  const {search} = useLocation() as MyLocation;
  const [searchParams, setSearchParams] = useSearchParams({
    city: DEFAULT_CITY,
    sortType: DEFAULT_SORT
  });

  const cityQuery = searchParams.get(CITY) as Cities;
  const sortTypeQuery = searchParams.get(SORT_TYPE) as SortType;

  const handleSortTypeChange = (sortType: SortType) => {
    searchParams.set(SORT_TYPE, sortType);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!search) {
      setSearchParams(searchParams);
    }
  }, [search, searchParams, setSearchParams]);

  const filteredOffers = useMemo(() => getCurrentOffers(cityQuery, offers), [cityQuery, offers]);

  const filteredAndSortedOffers = useMemo(() => sortingType[sortTypeQuery](filteredOffers), [filteredOffers, sortTypeQuery]);

  const hasNoFilteredOrSortedOffers = !filteredAndSortedOffers.length;

  return (
    <main
      className={
        cn(
          'page__main page__main--index',
          {'page__main--index-empty': hasNoFilteredOrSortedOffers}
        )
      }
    >
      <h1 className="visually-hidden">Cities</h1>
      <MemoizedTabs currentCity={cityQuery} />
      <div className="cities">
        <div
          className={
            cn(
              'cities__places-container container',
              {'cities__places-container--empty': hasNoFilteredOrSortedOffers}
            )
          }
        >
          <section
            className={hasNoFilteredOrSortedOffers ? 'cities__no-places' : 'cities__places places'}
          >
            {
              hasNoFilteredOrSortedOffers
                ?
                <MainEmpty currentCity={cityQuery} />
                :
                <>
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{filteredAndSortedOffers.length} places to stay in {capitalize(cityQuery)}</b>
                  <PlacesSorting currentSort={sortTypeQuery} onChangeSort={handleSortTypeChange} />
                  <div className="cities__places-list places__list tabs__content">
                    {
                      filteredAndSortedOffers.map((offer) => <PlaceCard key={offer.id} offer={offer} className='cities' onCardHover={setHoveredOfferId} />)
                    }
                  </div>
                </>
            }
          </section>
          <div className="cities__right-section">
            {
              !hasNoFilteredOrSortedOffers ? <Map className='cities' /> : null
            }
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
