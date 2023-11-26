import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface DetailState {
  isLoading: boolean;
  uid: string | null;
}

const initialState: DetailState = {
  isLoading: false,
  uid: null,
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    setDetailState: (state, action: PayloadAction<Partial<DetailState>>) =>
      Object.assign(state, action.payload),
  },
  extraReducers: {
    [HYDRATE]: (
      state: DetailState,
      action: PayloadAction<{ detail: Partial<DetailState> }>
    ) => {
      Object.assign(state, action.payload.detail);
    },
  },
});

export const { setDetailState } = detailSlice.actions;
export default detailSlice;
