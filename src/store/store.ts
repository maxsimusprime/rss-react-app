import { configureStore } from '@reduxjs/toolkit';
import itemSlice from './slices/itemSlice';

export const store = configureStore({
  reducer: {
    item: itemSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'development' ? false : true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
