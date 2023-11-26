import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Search from '@/components/Search/Search';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Index from '@/pages/index';

vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

describe('Search component', () => {
  it('renders correctly', async () => {
    mockRouter.push('/?pageSize=0&pageNumber=0');
    render(
      <Provider store={store}>
        <Search />
      </Provider>,
      { wrapper: MemoryRouterProvider }
    );

    expect(screen.getByTestId('search')).toBeInTheDocument();

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('shold change cookie with provided input value', async () => {
    mockRouter.push('/?pageSize=0&pageNumber=0&details=ASMA0000288988');
    render(
      <Provider store={store}>
        <Index />
      </Provider>,
      {
        wrapper: MemoryRouterProvider,
      }
    );

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    const expectedQuery = 'abc';

    fireEvent.change(searchInput, { target: { value: expectedQuery } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(global.document.cookie).toBe('searchQuery=abc');
    });
  });
});
