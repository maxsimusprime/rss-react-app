import { renderHook, waitFor } from '@testing-library/react';
import Wrapper from './helpers/Wrapper';
import { useGetItemsQuery, useGetItemByIdQuery } from '../services/api';
import {
  astronomicalObject,
  astronomicalObjectBaseResponse,
} from '../mocks/objects';

describe('RTK Query api', () => {
  it('return correct getItems data', async () => {
    const { result } = renderHook(
      () =>
        useGetItemsQuery({
          pageNumber: 0,
          pageSize: 10,
          searchQuery: '',
        }),
      {
        wrapper: Wrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.data).toMatchObject(astronomicalObjectBaseResponse);
    });
  });

  it('return correct getItem data', async () => {
    const { result } = renderHook(() => useGetItemByIdQuery('ASMA0000288988'), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.data?.astronomicalObject).toMatchObject(
        astronomicalObject
      );
    });
  });
});
