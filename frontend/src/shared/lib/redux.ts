import {
  asyncThunkCreator,
  buildCreateSlice,
  combineSlices,
  createAsyncThunk,
  createSelector,
  ThunkAction,
  UnknownAction
} from '@reduxjs/toolkit';
import { appStore, extraArgument } from '../../app/app-store';
import { useDispatch, useSelector, useStore } from 'react-redux';

export const reducer = combineSlices();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppState = any;
export type AppDispatch = typeof appStore.dispatch;
export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  typeof extraArgument,
  UnknownAction
>;
export type ExtraArgument = typeof extraArgument;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppStore = useStore.withTypes<typeof appStore>();
export const createAppSelector = createSelector.withTypes<AppState>();
export const createAppAsynkThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
}>();

export const createSlise = buildCreateSlice({
  creators: { asyncThunk:asyncThunkCreator }
});

// @jedmao/redux-mock-store D
