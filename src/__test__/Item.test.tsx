import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Item from '../components/Item/Item';
import astronomicalObject from '../mocks/astronomicalObject';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import App from '../App';
import Details from '../components/Details/Details';

const mockDetailsLoader = vi.fn(() => astronomicalObject);

const memoryRouter = createMemoryRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Details />,
        loader: mockDetailsLoader,
      },
    ],
  },
]);

describe('Tests for the Item (Card) component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <MemoryRouter initialEntries={['?page=1']}>
        <Item {...astronomicalObject} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/?page=1&details=ASMA0000288988'
    );
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/assets/images/star-system.png'
    );
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(<RouterProvider router={memoryRouter} />);

    waitFor(() => {
      const card = screen.getByTestId('card');
      fireEvent.click(card);
      expect(screen.getByTestId('details')).toBeInTheDocument();
    });
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    render(<RouterProvider router={memoryRouter} />);

    waitFor(() => {
      const card = screen.getByTestId('card');
      fireEvent.click(card);
      expect(mockDetailsLoader).toHaveBeenCalled();
    });
  });
});
