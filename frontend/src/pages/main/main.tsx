import { memo } from 'react';
import { getDataToMap } from '../../shared/lib/utils/utils';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../shared/lib/redux';
import { MemoizedMainEmpty, selectFilteredPlaces } from '../../features';
import { MemoizedMap, MemoizedPlacesSection, MemoizedTabsCity } from '../../widgest';

function Main() {
  const filteredPlaces = useAppSelector(selectFilteredPlaces);

  const hasNoplaces = !filteredPlaces.length;

  const placesMapItems = getDataToMap(filteredPlaces);

  return (
    <main
      className={
        cn(
          'page__main page__main--index',
          {'page__main--index-empty': hasNoplaces}
        )
      }
    >
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <MemoizedTabsCity />
      <div className="cities">
        <div
          className={
            cn(
              'cities__places-container container',
              {'cities__places-container--empty': hasNoplaces}
            )
          }
        >
          <section
            className={hasNoplaces ? 'cities__no-places' : 'cities__places places'}
          >
            { hasNoplaces ? <MemoizedMainEmpty /> : <MemoizedPlacesSection /> }
          </section>
          <div className="cities__right-section">
            {!hasNoplaces && <MemoizedMap className='cities' offers={placesMapItems} />}
          </div>
        </div>
      </div>
    </main>
  );
}

const MemoizedMain = memo(Main);

export {MemoizedMain};
