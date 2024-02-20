import PlaceCard from '../../place-card/place-card';
import PlacesSorting from '../../places-sorting/places-sorting';
import Tabs from '../../tabs/tabs';

type MainProps = {
  offersCount: number;
}

function Main({offersCount}: MainProps): JSX.Element {
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <Tabs />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersCount} places to stay in Amsterdam</b>
            <PlacesSorting />
            <div className="cities__places-list places__list tabs__content">
              <PlaceCard className='cities' />
              <PlaceCard className='cities' />
              <PlaceCard className='cities' />
              <PlaceCard className='cities' />
              <PlaceCard className='cities' />
              <PlaceCard className='cities' />
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
