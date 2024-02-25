import Map from '../../components/map/map';
import PlaceCard from '../../components/place-card/place-card';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import Tabs from '../../components/tabs/tabs';
import { useSearchParams } from 'react-router-dom';
import { CITY, Cities, DEFAULT_CITY, DEFAULT_SORT, SORT_TYPE, SortType } from '../../const';
import { capitalize, getCurrentOffers, sortingType } from '../../utils/utils';
import { useEffect, useMemo } from 'react';
import { Offers } from '../../types/offers';
import cn from 'classnames';
import MainEmpty from '../../components/main-empty/main-empty';

type MainProps = {
  offers: Offers;
}

function Main({offers}: MainProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const cityQuery = searchParams.get(CITY) as Cities;
  const sortTypeQuery = searchParams.get(SORT_TYPE) as SortType;

  const handleClickTabsItem = (cityName: Cities) => {
    setSearchParams({ city: cityName, sortType: sortTypeQuery });
  };

  const handleSortTypeChange = (sortType: SortType) => {
    setSearchParams({ city: cityQuery, sortType: sortType });
  };

  useEffect(() => {
    if (!cityQuery || !sortTypeQuery) {
      setSearchParams({
        city: DEFAULT_CITY,
        sortType: DEFAULT_SORT
      });
    }

  }, [cityQuery, setSearchParams, sortTypeQuery]);

  const filteredOffers = useMemo(() => getCurrentOffers(cityQuery, offers), [cityQuery, offers]);

  const sortedOffers = useMemo(() => {
    if (filteredOffers.length > 0 && sortingType[sortTypeQuery]) {
      return sortingType[sortTypeQuery](filteredOffers);
    } else {
      return filteredOffers;
    }
  }, [filteredOffers, sortTypeQuery]);

  // нужно ли вынести данную переменную в константу или функцию
  const hasNoFilteredOrSortedOffers = !sortedOffers.length;

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
      <Tabs onChangeCurrentTabs={handleClickTabsItem} currentCity={cityQuery} />
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
                  <b className="places__found">{filteredOffers.length} places to stay in {capitalize(cityQuery)}</b>
                  <PlacesSorting currentSort={sortTypeQuery} onChangeSort={handleSortTypeChange} />
                  <div className="cities__places-list places__list tabs__content">
                    {
                      sortedOffers.map((offer) => <PlaceCard key={offer.id} offer={offer} className='cities' />)
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
