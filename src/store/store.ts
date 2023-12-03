import { configureStore } from '@reduxjs/toolkit';
import formSlice from './slices.ts/formSlice';

export const store = configureStore({
  reducer: {
    [formSlice.name]: formSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
