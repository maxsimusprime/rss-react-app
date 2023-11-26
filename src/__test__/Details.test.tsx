import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import Details from '../components/Details/Details';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { setDetailState } from '@/store/slices/detailSlice';
import { server } from '@/mocks/server';
import Index from '@/pages/index';

vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

describe('Details (Detailed Card) component', async () => {
  it('correctly displays the detailed card data', async () => {
    mockRouter.push('/?pageSize=0&pageNumber=0&details=ASMA0000288988');
    store.dispatch(setDetailState({ isLoading: false, uid: 'ASMA0000288988' }));
    render(
      <Provider store={store}>
        <Details uid={'ASMA0000288988'} />
      </Provider>,
      {
        wrapper: MemoryRouterProvider,
      }
    );

    await waitFor(() => {
      expect(screen.getByTestId('details')).toBeInTheDocument();
      expect(screen.getByTestId('details-close')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        '/?pageSize=0&pageNumber=0'
      );
      expect(screen.getByRole('img')).toHaveAttribute('alt', 'card-logo');
    });
  });

  it('clicking the close button hides the component', async () => {
    mockRouter.push('/?pageSize=0&pageNumber=0&details=ASMA0000288988');
    store.dispatch(setDetailState({ isLoading: false, uid: 'ASMA0000288988' }));
    render(
      <Provider store={store}>
        <Index />
      </Provider>,
      {
        wrapper: MemoryRouterProvider,
      }
    );

    await waitFor(() => {
      expect(screen.getByTestId('details')).toBeInTheDocument();

      const closeLink = screen.getByRole('link', { name: 'Close' });
      fireEvent.click(closeLink);

      expect(mockRouter.asPath).toBe('/?pageSize=0&pageNumber=0');
    });
  });

  it('loading indicator is displayed while fetching data', async () => {
    mockRouter.push('/?pageSize=0&pageNumber=0&details=ASMA0000288988');
    store.dispatch(setDetailState({ isLoading: false, uid: 'ASMA0000288988' }));
    render(
      <Provider store={store}>
        <Details uid={'ASMA0000288988'} />
      </Provider>,
      {
        wrapper: MemoryRouterProvider,
      }
    );

    server.events.on('request:start', () => {
      expect(screen.getAllByTestId('loading')).toBeInTheDocument();
    });
  });
});
