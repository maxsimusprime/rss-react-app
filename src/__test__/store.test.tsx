import detailSlice, { setDetailState } from '../store/slices/detailSlise';
import itemSlice, { setItemState } from '../store/slices/itemSlise';
import searchSlice, { setSearchState } from '../store/slices/searchSlice';

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

describe('Reducers', () => {
  it('itemSlice reducer returns new state', () => {
    const initialState = { isLoading: false };
    const expected = { isLoading: true };
    const newState = itemSlice.reducer(initialState, setItemState(expected));
    expect(newState).toMatchObject(expected);
  });
  it('detailSlice reducer returns new state', () => {
    const initialState = { isLoading: false };
    const expected = { isLoading: true };
    const newState = detailSlice.reducer(
      initialState,
      setDetailState(expected)
    );
    expect(newState).toMatchObject(expected);
  });
  it('searchSlice reducer returns new state', () => {
    const initialState = {
      searchQuery: '',
      pageNumber: 0,
      pageSize: 1,
    };

    const expected = {
      searchQuery: 'abc',
      pageNumber: 1,
      pageSize: 2,
    };
    const newState = searchSlice.reducer(
      initialState,
      setSearchState(expected)
    );
    expect(newState).toMatchObject(expected);
  });
});
