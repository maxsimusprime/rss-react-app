import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import Item from '@/components/Card/Card';
import { astronomicalObject } from '../mocks/objects';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { server } from '../mocks/server';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Index from '@/pages/index';

vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

describe('Tests for the Item (Card) component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    render(<Item {...astronomicalObject} />);
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/?details=ASMA0000288988'
    );
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fpublic%2Fassets%2Fimages%2Fstar-system.png&w=640&q=75'
    );
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
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
      const cards = screen.getAllByTestId('card');
      const card = cards[0];

      expect(card).toBeInTheDocument();
      fireEvent.click(card);

      expect(mockRouter.asPath).toBe(
        '/?pageSize=10&pageNumber=0&details=ASMA0000015822'
      );
    });
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    mockRouter.push('/?pageSize=10&pageNumber=0');
    render(<Item {...astronomicalObject} />);

    const cards = screen.getAllByTestId('card');
    const card = cards[0];
    fireEvent.click(card);

    server.events.on('response:mocked', ({ request }) => {
      expect(
        request.url.startsWith(
          'https://stapi.co/api/v2/rest/astronomicalObject/'
        )
      ).toBeTruthy();
    });
  });
});
