import cn from 'classnames';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { AppRoute } from '../../shared/lib/const/const';
import { useAppSelector } from '../../hooks';
import { getFavoritsData } from '../../store/favorite-process/favorite-process.selectors';
import { useMemo } from 'react';
import { MyLocation } from '../../shared/types/my-location';
import { MemoizedHeader } from '../../widgest';

export function Layout() {
  const { pathname } = useLocation() as MyLocation;
  // const favoriteOffers = useAppSelector(getFavoritsData);
  const favoriteOffers = [];
  const classLink = useMemo(() =>
    cn('page',
      {'page--gray page--main' : pathname === AppRoute.Root},
      {'page--gray page--login': pathname === AppRoute.Login},
      {'page--favorites-empty': pathname === AppRoute.Favorites && !favoriteOffers.length},
    ), [favoriteOffers.length, pathname]);

  return (
    <div className={classLink} >
      <ScrollRestoration />
      <MemoizedHeader pathname={pathname} />
      <Outlet />
    </div>
  );
}
