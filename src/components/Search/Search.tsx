import { ChangeEvent, useRef, useState } from 'react';
import type { SearchProps } from '../../dto/types';
import './search.css';

export default function Search({
  query,
  setQuery,
  setSearchParams,
}: SearchProps) {
  const [inputValue, setInputValue] = useState<string>(query);

  const ref = useRef<HTMLInputElement | null>(null);

  const searchButtonHandle = async (): Promise<void> => {
    localStorage.setItem('searchQuery', inputValue);
    setQuery(inputValue.trim());
    setSearchParams(new URLSearchParams({ page: '0' }));
  };

  const changeInputHandle = (e: ChangeEvent): void => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    setInputValue(input.value.trim());
  };

  return (
    <div className="search">
      <input
        type="search"
        value={inputValue}
        ref={ref}
        onChange={(e) => changeInputHandle(e)}
      />
      <button onClick={() => searchButtonHandle()}>Search</button>
    </div>
  );
}
