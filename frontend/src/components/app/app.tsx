import MemoizedLogin from '../../pages/login/login';
import { HelmetProvider } from 'react-helmet-async';
import MemoizedMain from '../../pages/main/main';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, Status } from '../../const';
import Layout from '../layout/layout';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import Favorites from '../../pages/favorites/favorites';
import PrivateRoute from '../private-route/private-route';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { getOffersLoadingStatus } from '../../store/offer-process/offer-process.selectors';
import { useEffect } from 'react';
import { fetchFavoriteOffersAction, fetchOffersAction } from '../../store/api-actions';
import ErrorLoadSreen from '../error-load-screen/error-load-screen';
import MemoizedOfferPage from '../../pages/offer-page/offer-page';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthChecked = useAppSelector(getAuthorizationStatus);
  const isDataLoading = useAppSelector(getOffersLoadingStatus);

  useEffect(() => {
    if (isAuthChecked === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [dispatch, isAuthChecked]);

  if (isAuthChecked === AuthorizationStatus.Unknown || isDataLoading === Status.Loading) {
    return (
      <LoadingScreen />
    );
  }

  if (isDataLoading === Status.Failed) {
    return (
      <ErrorLoadSreen onButtonDispatchClick={fetchOffersAction} />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route index element={<MemoizedMain />} />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute authorizationStatus={isAuthChecked} isReverse>
                  <MemoizedLogin />
                </PrivateRoute>
              }
            />
            <Route path={`${AppRoute.Offer}:id`} element={<MemoizedOfferPage />} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={isAuthChecked}>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
