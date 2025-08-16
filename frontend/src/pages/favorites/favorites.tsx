import MemoizedLogo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import MemoizedFavoritesList from '../../components/favorites-list/favorites-list';
import { useAppSelector } from '../../hooks';
import { getFavoriteLoadingStatus, getFavoritsData } from '../../store/favorite-process/favorite-process.selectors';
import { Status } from '../../const';
import LoadingScreen from '../../components/loading-screen/loading-screen';

function Favorites(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoritsData);
  const isLoadingFavoriteOffers = useAppSelector(getFavoriteLoadingStatus);

  if (isLoadingFavoriteOffers === Status.Loading) {
    return <LoadingScreen />;
  }

  const hasNoOffersFavoriteLength = !favoriteOffers.length;

  return (
    <>
      <Helmet>
        <title>6 cities: {hasNoOffersFavoriteLength ? 'favorites empty' : 'favorites'}</title>
      </Helmet>
      <main
        className={
          cn(
            'page__main page__main--favorites',
            {'page__main--favorites-empty': hasNoOffersFavoriteLength}
          )
        }
      >
        <div className="page__favorites-container container">
          <section
            className={
              cn(
                'favorites',
                {'favorites--empty': hasNoOffersFavoriteLength}
              )
            }
          >
            <h1
              className={
                cn(
                  {'favorites__title': !hasNoOffersFavoriteLength},
                  {'visually-hidden': hasNoOffersFavoriteLength}
                )
              }
            >
              {hasNoOffersFavoriteLength ? 'Favorites (empty)' : 'Saved listing'}
            </h1>
            {hasNoOffersFavoriteLength ? <FavoritesEmpty /> : <MemoizedFavoritesList favoriteOffers={favoriteOffers} />}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <MemoizedLogo isFooter />
      </footer>
    </>
  );
}

export default Favorites;
