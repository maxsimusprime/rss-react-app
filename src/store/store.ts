import { configureStore } from '@reduxjs/toolkit';
import formSlice from './slices.ts/formSlice';
import { converter } from './middlewares/converter';

export const store = configureStore({
  reducer: {
    [formSlice.name]: formSlice.reducer,
  },
  middleware: [converter] as const,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
