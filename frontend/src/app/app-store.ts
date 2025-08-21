import { configureStore } from '@reduxjs/toolkit';
import { routes } from './routes/routes';
import middleware, { listenerMiddleware, reducer } from '../shared/lib/redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { store } from '../store';

export const extraArgument = {
  routes,
};

export const appStore = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {extraArgument}
    })
      .concat(listenerMiddleware.middleware)
      .prepend(middleware),
});

setupListeners(store.dispatch);
