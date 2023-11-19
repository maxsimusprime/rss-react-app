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

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchState: (state, action: PayloadAction<Partial<SearchState>>) =>
      Object.assign(state, action.payload),
  },
});

export const { setSearchState } = searchSlice.actions;
export default searchSlice;
