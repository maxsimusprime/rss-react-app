import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { PAGE_LIMIT } from '../../dto/constants';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  searchQuery: string;
  pageNumber: number;
  pageSize: number;
}

const initialState: SearchState = {
  searchQuery: '',
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
  extraReducers: {
    [HYDRATE]: (
      state: SearchState,
      action: PayloadAction<{ search: Partial<SearchState> }>
    ) => {
      Object.assign(state, action.payload.search);
    },
  },
});

export const { setSearchState } = searchSlice.actions;
export default searchSlice;
