import { useState, useEffect } from 'react';
import './App.css';
import List from './components/List/List';
import Loading from './components/_ui/bars/Loading/Loading';
import Search from './components/Search/Search';
import SearchLimit from './components/Search/SearchLimit';
import type { AstronomicalObject, Page } from './dto/types';
import { PAGE_LIMIT } from './dto/constants';
import { getAstronomicalObjectBaseResponse } from './api/api';
import { Outlet, useSearchParams } from 'react-router-dom';
import { AppContext } from './AppContext';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [items, setItems] = useState<AstronomicalObject[]>([]);

  const [query, setQuery] = useState<string>(
    localStorage.getItem('searchQuery') || ''
  );

  const [pageLimit, setPageLimit] = useState<number>(PAGE_LIMIT);

  const [page, setPage] = useState<Page>();

  const [searchParams, setSearchParams] = useSearchParams();

  const [pageNumber, setPageNumber] = useState<number>(
    Number(searchParams.get('page')) || 0
  );

  useEffect(() => {
    const paramPageNumber = searchParams.has('page')
      ? Number(searchParams.get('page'))
      : 0;
    if (pageNumber !== paramPageNumber) setPageNumber(paramPageNumber);
  }, [pageNumber, searchParams]);

  useEffect(() => {
    setIsLoading(true);
    getAstronomicalObjectBaseResponse({
      limit: pageLimit,
      offset: pageNumber,
      searchQuery: query,
    })
      .then((res) => {
        if (!('error' in res)) {
          const { astronomicalObjects, page } = res;
          setItems(astronomicalObjects);
          setPage(page);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pageLimit, pageNumber, query]);

  return (
    <AppContext.Provider value={{ query, setQuery, items, page }}>
      <header
        style={{ display: 'flex', justifyContent: 'center' }}
        className="header"
      >
        <Search setSearchParams={setSearchParams} />
        <button
          onClick={() => {
            throw new Error('Error button handle');
          }}
        >
          Error
        </button>
        <SearchLimit
          setPageLimit={setPageLimit}
          setSearchParams={setSearchParams}
        />
      </header>
      <hr />
      <main className="main">
        {isLoading ? <Loading /> : <List />}
        {searchParams.has('details') && <Outlet />}
      </main>
    </AppContext.Provider>
  );
}
