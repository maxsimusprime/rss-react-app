import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface ItemState {
  isLoading: boolean;
}

const initialState: ItemState = {
  isLoading: false,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItemState: (state, action: PayloadAction<Partial<ItemState>>) =>
      Object.assign(state, action.payload),
  },
  extraReducers: {
    [HYDRATE]: (
      state: ItemState,
      action: PayloadAction<{ item: Partial<ItemState> }>
    ) => {
      Object.assign(state, action.payload.item);
    },
  },
});

export const { setItemState } = itemSlice.actions;
export default itemSlice;
