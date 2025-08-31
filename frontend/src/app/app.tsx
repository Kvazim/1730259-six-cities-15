import { HelmetProvider } from 'react-helmet-async';
import { Route, RouterProvider, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, Status } from '../shared/lib/const/const';
import PageNotFound from '../pages/page-not-found/page-not-found';
import Favorites from '../pages/favorites/favorites';
// import { useAppDispatch, useAppSelector } from '../hooks';
import LoadingScreen from '../shared/ui/loading-screen/loading-screen';
// import { getAuthorizationStatus } from '../store/user-process/user-process.selectors';
import { getOffersLoadingStatus } from '../store/offer-process/offer-process.selectors';
import { useEffect } from 'react';
import { fetchFavoriteOffersAction, fetchOffersAction } from '../store/api-actions';
import ErrorLoadSreen from '../shared/ui/error-load-screen/error-load-screen';
import MemoizedOfferPage from '../pages/offer-page/offer-page';
import MemoizedLogin from '../pages/login/login';
import MemoizedMain from '../pages/main/main';
import Layout from './layout/layout';
import PrivateRoute from './routes/private-route';
import HistoryRouter from './routes/history-route';
import browserHistory from './routes/browser-history';
import { routes } from './routes/routes';
import { useCheckAuthQuery } from '../entities/header-nav/model/user-api';
import { appStore } from './app-store';
import { useAppSelector } from '../shared/lib/redux';
import { authStatus } from '../entities';
import { getPlacesPrefetch, selectPlacesApi } from '../features';
import { QueryStatus } from '@reduxjs/toolkit/query';

function App() {
  // const dispatch = useAppDispatch();
  const isAuthChecked = useAppSelector(authStatus);
  const { status } = useAppSelector(selectPlacesApi);
  const isDataLoading = status === QueryStatus.pending;
  const isDataError = status === QueryStatus.rejected;

  // useEffect(() => {
  //   if (isAuthChecked === AuthorizationStatus.Auth) {
  //     dispatch(fetchFavoriteOffersAction());
  //   }
  // }, [dispatch, isAuthChecked]);

  if (isAuthChecked === AuthorizationStatus.Unknown || isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (isDataError) {
    return (
      <ErrorLoadSreen onButtonDispatchClick={getPlacesPrefetch} />
    );
  }

  return (
    <HelmetProvider>
      <RouterProvider
        router={routes}
      />
    </HelmetProvider>
  );
}

export default App;
