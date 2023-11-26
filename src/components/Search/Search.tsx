import { ChangeEvent, FC, useState } from 'react';
import styles from './Search.module.css';
import { setCookie } from 'nookies';
import router from 'next/router';
import { useAppSelector } from '@/hooks/useAppSelector';

const Search: FC = () => {
  const { searchQuery } = useAppSelector((state) => state.search);
  const [inputValue, setInputValue] = useState<string>(searchQuery);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const buttonHandler = () => {
    setCookie(null, 'searchQuery', inputValue, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    router.push(`/search?pageSize=10&pageNumber=0`);
  };

  return (
    <div className={styles.search} data-testid={'search'}>
      <input
        type="search"
        value={inputValue}
        onChange={(e) => inputHandler(e)}
        data-testid={'search-input'}
      />
      <button onClick={() => buttonHandler()} data-testid={'search-button'}>
        Search
      </button>
    </div>
  );
};

export default Search;
