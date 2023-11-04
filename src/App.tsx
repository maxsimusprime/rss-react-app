import { useState, useEffect } from 'react';
import './styles/App.css';
import List from './components/List/List';
import Loading from './components/_ui/bars/Loading/Loading';
import Search from './components/Search/Search';
import type { AstronomicalObject, AppState } from './dto/types';
import { PAGE_LIMIT } from './dto/constants';
import { getAstronomicalObject } from './api/api';

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    isLoading: true,
  });

  const [items, setItems] = useState<AstronomicalObject[]>([]);
  const [query, setQuery] = useState<string>(
    localStorage.getItem('searchQuery') || ''
  );
  const [offset] = useState<number>(0);

  useEffect(() => {
    const updateItems = async (): Promise<void> => {
      setAppState({ isLoading: true });
      const items = await getAstronomicalObject({
        limit: PAGE_LIMIT,
        offset,
        searchQuery: query,
      });
      setAppState({ isLoading: false });
      setItems(items);
    };
    setAppState({ isLoading: true });
    updateItems();
  }, [offset, query]);

  return (
    <>
      <header
        style={{ display: 'flex', justifyContent: 'center' }}
        className="header"
      >
        <Search query={query} setQuery={setQuery} />
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
        {appState.isLoading ? <Loading /> : <List items={items} />}
      </main>
    </>
  );
}
