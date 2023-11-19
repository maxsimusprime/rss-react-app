import type {
  AstronomicalObjectBaseResponse,
  AstronomicalObjectResponse,
} from '../dto/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URI } from '../dto/constants';
import { setItemState } from '../store/slices/itemSlise';
import { setDetailState } from '../store/slices/detailSlise';

interface GetItemsQueryParams {
  pageNumber: number;
  pageSize: number;
  searchQuery: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URI }),
  endpoints: (builder) => ({
    getItems: builder.query<
      AstronomicalObjectBaseResponse,
      GetItemsQueryParams
    >({
      query: ({ pageNumber, pageSize, searchQuery }) => ({
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: 'search',
        params: {
          pageNumber,
          pageSize,
        },
        body: `name=${searchQuery || ''}`,
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(setItemState({ isLoading: true }));
        try {
          dispatch(setItemState({ isLoading: false }));
        } catch (err) {
          dispatch(setItemState({ isLoading: false }));
        }
      },
    }),
    getItemById: builder.query<AstronomicalObjectResponse, string>({
      query: (uid) => ({
        method: 'get',
        url: '',
        params: {
          uid,
        },
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(setDetailState({ isLoading: true }));
        try {
          dispatch(setDetailState({ isLoading: false }));
        } catch (err) {
          dispatch(setDetailState({ isLoading: false }));
        }
      },
    }),
  }),
});

export const { useGetItemsQuery, useGetItemByIdQuery } = api;
