import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface DetailState {
  isLoading: boolean;
}

const initialState: DetailState = {
  isLoading: false,
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    setDetailState: (state, action: PayloadAction<Partial<DetailState>>) =>
      Object.assign(state, action.payload),
  },
});

export const { setDetailState } = detailSlice.actions;
export default detailSlice;
