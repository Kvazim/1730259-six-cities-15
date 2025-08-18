import cn from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../shared/lib/const/const';
import MemoizedHeader from '../header/header';
import ScrollToTop from '../../features/scroll-to-top/scroll-to-top';
import { useAppSelector } from '../../hooks';
import { getFavoritsData } from '../../store/favorite-process/favorite-process.selectors';
import { useMemo } from 'react';
import { MyLocation } from '../../shared/types/my-location';

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
