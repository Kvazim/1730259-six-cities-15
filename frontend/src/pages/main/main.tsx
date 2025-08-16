import MemoizedMap from '../../components/map/map';
import MemoizedPlaceCard from '../../components/place-card/place-card';
import MemoizedPlacesSorting from '../../components/places-sorting/places-sorting';
import MemoizedTabs from '../../components/tabs/tabs';
import { useLocation, useSearchParams } from 'react-router-dom';
import { CITY, Cities, DEFAULT_CITY, DEFAULT_ONE, DEFAULT_SORT, SORT_TYPE, SortType } from '../../const';
import { capitalize, getCurrentOffers, getDataToMap, sortingType } from '../../utils/utils';
import { memo, useCallback, useEffect, useMemo } from 'react';
import cn from 'classnames';
import MainEmpty from '../../components/main-empty/main-empty';
import { MyLocation } from '../../types/my-location';
import { useAppSelector } from '../../hooks';
import { Helmet } from 'react-helmet-async';
import { getOffersData } from '../../store/offer-process/offer-process.selectors';

function Main(): JSX.Element {
  const offers = useAppSelector(getOffersData);
  const {search} = useLocation() as MyLocation;
  const [searchParams, setSearchParams] = useSearchParams({
    city: DEFAULT_CITY,
    sortType: DEFAULT_SORT
  });

  const cityQuery = searchParams.get(CITY) as Cities;
  const sortTypeQuery = useMemo(() => searchParams.get(SORT_TYPE) as SortType,[searchParams]);

  const handleSortTypeChange = useCallback((sortType: SortType) => {
    searchParams.set(SORT_TYPE, sortType);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (!search) {
      setSearchParams(searchParams);
    }
  }, [search, searchParams, setSearchParams]);

  const filteredOffers = useMemo(() => getCurrentOffers(cityQuery, offers), [cityQuery, offers]);

  const filteredAndSortedOffers = useMemo(() => sortingType[sortTypeQuery](filteredOffers), [filteredOffers, sortTypeQuery]);

  const hasNoFilteredOrSortedOffers = !filteredAndSortedOffers.length;

  const offerMapItems = getDataToMap(filteredOffers);

  return (
    <main
      className={
        cn(
          'page__main page__main--index',
          {'page__main--index-empty': hasNoFilteredOrSortedOffers}
        )
      }
    >
      <Helmet>
        <title>6 cities</title>
      </Helmet>
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
                  <b className="places__found">
                    {filteredAndSortedOffers.length} {filteredAndSortedOffers.length > DEFAULT_ONE ? 'places' : 'place'} to stay in {capitalize(cityQuery)}
                  </b>
                  <MemoizedPlacesSorting currentSort={sortTypeQuery} onChangeSort={handleSortTypeChange} />
                  <div className="cities__places-list places__list tabs__content">
                    {
                      filteredAndSortedOffers.map((offer) => <MemoizedPlaceCard key={offer.id} offer={offer} className='cities' />)
                    }
                  </div>
                </>
            }
          </section>
          <div className="cities__right-section">
            {!hasNoFilteredOrSortedOffers && <MemoizedMap className='cities' offers={offerMapItems} />}
          </div>
        </div>
      </div>
    </main>
  );
}

const MemoizedMain = memo(Main);

export default MemoizedMain;
