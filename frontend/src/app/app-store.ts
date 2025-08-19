import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { routes } from './routes/routes';
import { reducer } from '../shared/lib/redux';

export const extraArgument = {
  routes,
};

export const listenerMiddleware = createListenerMiddleware();

export const appStore = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {extraArgument}
    }).prepend(listenerMiddleware.middleware),
});
