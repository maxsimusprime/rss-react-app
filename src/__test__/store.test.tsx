import { setDetailState } from '../store/slices/detailSlise';
import { setItemState } from '../store/slices/itemSlise';
import { setSearchState } from '../store/slices/searchSlice';

describe('Actions cretors', () => {
  it('searchSlice action creator returns valid action object', () => {
    const payload = { searchQuery: 'abc', pageNumber: 0, pageSize: 5 };
    const expected = { type: 'search/setSearchState', payload };
    expect(setSearchState(payload)).toMatchObject(expected);
  });

  it('detailSlice action creator returns valid action object', () => {
    const payload = { isLoading: true };
    const expected = { type: 'detail/setDetailState', payload };
    expect(setDetailState(payload)).toMatchObject(expected);
  });

  it('itemSlice action creator returns valid action object', () => {
    const payload = { isLoading: true };
    const expected = { type: 'item/setItemState', payload };
    expect(setItemState(payload)).toMatchObject(expected);
  });
});
