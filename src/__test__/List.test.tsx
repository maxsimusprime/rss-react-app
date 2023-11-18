import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import List from '../components/List/List';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { server } from '../mocks/server';
import { astronomicalObjectBaseResponseHandle, nullAstronomicalObjectBaseResponseHandle } from '../mocks/handlers';

describe('List (Card List) component', async () => {

  it('component renders the specified number of cards', async () => {
    server.use(astronomicalObjectBaseResponseHandle);
    const countOfItemsOnPage = 10;
    
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?']}>
          <List />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const items = screen
        .getAllByRole('link')
        .filter((item) => item.classList.contains('item__link'));
  
      expect(items.length).toBe(countOfItemsOnPage);
    });
  });

  it('appropriate message is displayed if no cards are present', async () => {
    server.use(nullAstronomicalObjectBaseResponseHandle);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <List />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Items Not Found')).toBeInTheDocument();
    });
  });
});
