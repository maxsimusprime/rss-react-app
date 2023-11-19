import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
});

export const { setItemState } = itemSlice.actions;
export default itemSlice;
