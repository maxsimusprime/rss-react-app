import { ChangeEvent, useContext, useState } from 'react';
import type { SearchProps } from '../../dto/types';
import './search.css';
import { AppContext } from '../../AppContext';

export default function Search({
  setSearchParams,
}: SearchProps) {
  const { query, setQuery } = useContext(AppContext);

  const [inputValue, setInputValue] = useState<string>(query || '');

  const searchButtonHandle = async (): Promise<void> => {
    localStorage.setItem('searchQuery', inputValue);
    if (setQuery) setQuery(inputValue.trim());
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
      />
      <button onClick={() => searchButtonHandle()}>Search</button>
    </div>
  );
}
