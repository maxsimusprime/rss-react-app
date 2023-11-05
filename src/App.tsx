import { useState, useEffect } from 'react';
import './App.css';
import List from './components/List/List';
import Loading from './components/_ui/bars/Loading/Loading';
import Search from './components/Search/Search';
import type { AstronomicalObject, AppState, Page } from './dto/types';
import { PAGE_LIMIT } from './dto/constants';
import { getAstronomicalObjectBaseResponse } from './api/api';
import { Outlet, useSearchParams } from 'react-router-dom';

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    isLoading: true,
  });

  const [items, setItems] = useState<AstronomicalObject[]>([]);
  const [query, setQuery] = useState<string>(
    localStorage.getItem('searchQuery') || ''
  );
  const [offset] = useState<number>(0);

  const [page, setPage] = useState<Page>();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const offset = searchParams.get('page')
      ? Number(searchParams.get('page'))
      : 0;

    const updateItems = async (): Promise<void> => {
      setAppState({ isLoading: true });
      const response = await getAstronomicalObjectBaseResponse({
        limit: PAGE_LIMIT,
        offset,
        searchQuery: query,
      });

      if (!('error' in response)) {
        const { astronomicalObjects, page } = response;
        setItems(astronomicalObjects);
        setPage(page);
      }
      setAppState({ isLoading: false });
    };
    setAppState({ isLoading: true });
    updateItems();
  }, [offset, query, searchParams]);

  return (
    <>
      <header
        style={{ display: 'flex', justifyContent: 'center' }}
        className="header"
      >
        <Search
          query={query}
          setQuery={setQuery}
          setSearchParams={setSearchParams}
        />
        <button
          onClick={() => {
            throw new Error('Error button handle');
          }}
        >
          Error
        </button>
      </header>
      <hr />
      <main className="main">
        {appState.isLoading ? <Loading /> : <List items={items} page={page} />}
        {searchParams.has('details') && <Outlet />}
      </main>
    </>
  );
}
