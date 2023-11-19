import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setSearchState } from '../../store/slices/searchSlice';

export default function SearchLimit() {
  const dispatch = useAppDispatch();

  const setLimitHandle = (limit: number): void => {
    dispatch(setSearchState({ pageSize: limit, pageNumber: 0 }));
  };

  return (
    <div style={{ display: 'flex', columnGap: '10px' }} data-testid={'page-size'}>
      <span>Page limit</span>
      <button data-testid={'page-size-10'} onClick={() => setLimitHandle(10)}>10</button>
      <button data-testid={'page-size-20'} onClick={() => setLimitHandle(20)}>20</button>
      <button data-testid={'page-size-50'} onClick={() => setLimitHandle(50)}>50</button>
    </div>
  );
}
