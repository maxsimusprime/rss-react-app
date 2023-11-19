import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import SearchLimit from '../components/Search/SearchLimit';
import { store } from '../store/store';
import { Provider } from 'react-redux';

describe('SearchLimit component', () => {
  it('renders correctly', async () => {
    render(
      <Provider store={store}>
        <SearchLimit />
      </Provider>
    );
    expect(screen.getByTestId('page-size')).toBeInTheDocument();

    const pageSize10 = screen.getByTestId('page-size-10');
    const pageSize20 = screen.getByTestId('page-size-20');
    const pageSize50 = screen.getByTestId('page-size-50');

    expect(pageSize10).toBeInTheDocument();
    expect(pageSize20).toBeInTheDocument();
    expect(pageSize50).toBeInTheDocument();

    fireEvent.click(pageSize10);
    expect(store.getState().search.pageSize).toBe(10);

    fireEvent.click(pageSize20);
    expect(store.getState().search.pageSize).toBe(20);

    fireEvent.click(pageSize50);
    expect(store.getState().search.pageSize).toBe(50);
  });
});
