import { ChangeEvent, useState } from 'react';
import './search.css';
import { setSearchState } from '../../store/slices/searchSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';

interface SerchProps {
  setSearchParams: (params: URLSearchParams) => void;
}

export default function Search({ setSearchParams }: SerchProps) {
  const { searchQuery } = useAppSelector((state) => state.item);
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<string>(searchQuery);

  const searchButtonHandle = async (): Promise<void> => {
    localStorage.setItem('searchQuery', inputValue);
    dispatch(setSearchState({ searchQuery: inputValue.trim() }));

    setSearchParams(new URLSearchParams({ page: '0' }));
  };

  const changeInputHandle = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInputValue(e.target.value.trim());
  };

  return (
    <div className="search">
      <input
        type="search"
        value={inputValue}
        onChange={(e) => changeInputHandle(e)}
        data-testid={'search-input'}
      />
      <button
        onClick={() => searchButtonHandle()}
        data-testid={'search-button'}
      >
        Search
      </button>
    </div>
  );
}
