import cn from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import MemoizedHeader from '../header/header';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { useAppSelector } from '../../hooks';
import { getFavoritsData } from '../../store/favorite-process/favorite-process.selectors';
import { MyLocation } from '../../types/my-location';
import { useMemo } from 'react';

function Layout(): JSX.Element {
  const { pathname } = useLocation() as MyLocation;
  const favoriteOffers = useAppSelector(getFavoritsData);
  const classLink = useMemo(() =>
    cn('page',
      {'page--gray page--main' : pathname === AppRoute.Root},
      {'page--gray page--login': pathname === AppRoute.Login},
      {'page--favorites-empty': pathname === AppRoute.Favorites && !favoriteOffers.length},
    ), [favoriteOffers.length, pathname]);

  return (
    <div className={classLink} >
      <ScrollToTop />
      <MemoizedHeader pathname={pathname} />
      <Outlet />
    </div>
  );
}

export default Layout;
