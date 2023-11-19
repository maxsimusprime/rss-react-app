import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Search from '../components/Search/Search';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { store } from '../store/store';
import { Provider } from 'react-redux';

const memoryRouter = createMemoryRouter([
  {
    path: '/',
    element: <Search setSearchParams={vi.fn()} />,
  },
]);

global.localStorage = {
  setItem: vi.fn(),
  getItem: vi.fn(),
  clear: vi.fn(),
  length: 1,
  key: vi.fn(),
  removeItem: vi.fn(),
};

describe('Search component', () => {
  it('renders correctly', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={memoryRouter} />
      </Provider>
    );
    expect(screen.getByTestId('search')).toBeInTheDocument();

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    const expectedQuery = 'abc';

    fireEvent.change(searchInput, { target: { value: expectedQuery } });
    fireEvent.click(searchButton);

    expect(global.localStorage.setItem).toBeCalledWith(
      'searchQuery',
      expectedQuery
    );
    expect(store.getState().search.searchQuery).toBe(expectedQuery);
  });
});
