import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';
import { api } from '../services/api';

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  devTools: process.env.NODE_ENV !== 'development' ? false : true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
