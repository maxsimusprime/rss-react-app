import { useEffect } from 'react';
import './App.css';
import List from './components/List/List';
import Search from './components/Search/Search';
import SearchLimit from './components/Search/SearchLimit';
import { Outlet, useSearchParams } from 'react-router-dom';
import ErrorButton from './components/ErrorButton/ErrorButton';
import { useAppDispatch } from './hooks/useAppDispatch';
import { setSearchState } from './store/slices/searchSlice';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const pageNumber = Number(searchParams.get('page') || 0);
    dispatch(setSearchState({ pageNumber }));
  }, [dispatch, searchParams]);

  return (
    <>
      <header className="header">
        <Search setSearchParams={setSearchParams} />
        <ErrorButton />
        <SearchLimit setSearchParams={setSearchParams} />
      </header>
      <hr />
      <main className="main">
        <List />
        {searchParams.has('details') && (
          <Outlet context={[searchParams.get('details')]} />
        )}
      </main>
    </>
  );
}
