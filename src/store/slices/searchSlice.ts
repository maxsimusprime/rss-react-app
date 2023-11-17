import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PAGE_LIMIT } from '../../dto/constants';

interface SearchState {
  searchQuery: string;
  pageNumber: number;
  pageSize: number;
}

const initialState: SearchState = {
  searchQuery: localStorage.getItem('searchQuery') || '',
  pageNumber: 0,
  pageSize: PAGE_LIMIT,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setSearchState: (state, action: PayloadAction<Partial<SearchState>>) =>
      Object.assign(state, action.payload),
  },
});

export const { setSearchState } = itemSlice.actions;
export default itemSlice;
