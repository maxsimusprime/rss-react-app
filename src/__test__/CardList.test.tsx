import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { server } from '../mocks/server';
import {
  astronomicalObjectBaseResponseHandler,
  nullAstronomicalObjectBaseResponseHandler,
} from '../mocks/handlers';

import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Index from '@/pages/index';

vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

describe('List (CardList) component', async () => {
  it('component renders the specified number of cards', async () => {
    server.use(astronomicalObjectBaseResponseHandler);
    mockRouter.push('/?pageSize=10&pageNumber=0');
    render(
      <Provider store={store}>
        <Index />
      </Provider>,
      {
        wrapper: MemoryRouterProvider,
      }
    );

    const expected = 10;

    await waitFor(() => {
      const items = screen.getAllByTestId('card');
      expect(items.length).toBe(expected);
    });
  });

  it('appropriate message is displayed if no cards are present', async () => {
    server.use(nullAstronomicalObjectBaseResponseHandler);

    mockRouter.push('/?pageSize=10&pageNumber=0');
    render(
      <Provider store={store}>
        <Index />
      </Provider>,
      {
        wrapper: MemoryRouterProvider,
      }
    );

    await waitFor(() => {
      expect(screen.getByText('No Items To Display')).toBeInTheDocument();
    });
  });
});
