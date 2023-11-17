import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setSearchState } from '../../store/slices/searchSlice';

interface SearchLimitProps {
  setSearchParams: (params: URLSearchParams) => void;
}

export default function SearchLimit({ setSearchParams }: SearchLimitProps) {
  const dispatch = useAppDispatch();

  const setLimitHandle = (limit: number): void => {
    setSearchParams(new URLSearchParams({ page: '0' }));
    dispatch(setSearchState({ pageSize: limit }));
  };

  return (
    <div style={{ display: 'flex', columnGap: '10px' }}>
      <span>Page limit</span>
      <button onClick={() => setLimitHandle(10)}>10</button>
      <button onClick={() => setLimitHandle(20)}>20</button>
      <button onClick={() => setLimitHandle(50)}>50</button>
    </div>
  );
}
