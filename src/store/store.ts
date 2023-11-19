import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';
import itemSlice from './slices/itemSlise';
import detailSlice from './slices/detailSlise';
import { api } from '../services/api';

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    [api.reducerPath]: api.reducer,
    item: itemSlice.reducer,
    detail: detailSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'development' ? false : true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
