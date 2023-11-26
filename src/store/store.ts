import { configureStore, Store, ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import searchSlice from './slices/searchSlice';
import itemSlice from './slices/itemSlice';
import detailSlice from './slices/detailSlice';
import { api } from '../services/api';

const makeStore = () =>
  configureStore({
    reducer: {
      [searchSlice.name]: searchSlice.reducer,
      [api.reducerPath]: api.reducer,
      [itemSlice.name]: itemSlice.reducer,
      [detailSlice.name]: detailSlice.reducer,
    },
    middleware: (gDM) => gDM().concat(api.middleware),
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});

// export const store = configureStore({
//   reducer: {
//     [searchSlice.name]: searchSlice.reducer,
//     [api.reducerPath]: api.reducer,
//     [itemSlice.name]: itemSlice.reducer,
//     [detailSlice.name]: detailSlice.reducer,
//   },
//   devTools: process.env.NODE_ENV !== 'development' ? false : true,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
