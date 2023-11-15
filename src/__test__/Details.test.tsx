import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Details from '../components/Details/Details';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import astronomicalObject from '../mocks/astronomicalObject';
import { detailsLoader } from '../components/Details/Details';
import App from '../App';

const { mockedUseNavigation } = vi.hoisted(() => {
  return { mockedUseNavigation: vi.fn() };
});

vi.mock('react-router-dom', async (importOriginal) => {
  const module: object = await importOriginal();
  return {
    ...module,
    useLoaderData: () => astronomicalObject,
    useNavigation: mockedUseNavigation,
  };
});

describe('Details (Detailed Card) component', async () => {
  it('loading indicator is displayed while fetching data', () => {
    mockedUseNavigation.mockReturnValue({ state: 'loading' });
    render(
      <MemoryRouter initialEntries={['/?page=3&details=ASMA0000288988']}>
        <Details />
      </MemoryRouter>
    );
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/assets/images/spinner.gif'
    );
  });

  it('correctly displays the detailed card data', () => {
    mockedUseNavigation.mockReturnValue({ state: 'idle' });
    render(
      <MemoryRouter initialEntries={['/?page=3&details=ASMA0000288988']}>
        <Details />
      </MemoryRouter>
    );
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/assets/images/star-system.png'
    );
    expect(screen.getByRole('link', { name: 'Close' })).toHaveAttribute(
      'href',
      '/?page=3'
    );
  });

  it('clicking the close button hides the component', async () => {
    const memoryRouter = createMemoryRouter(
      [
        {
          path: '/',
          element: <App />,
          children: [
            {
              path: '/',
              element: <Details />,
              loader: vi.fn(() => astronomicalObject),
            },
          ],
        },
      ],
      {
        initialEntries: ['/?details=ASMA0000288988'],
      }
    );

    render(<RouterProvider router={memoryRouter} />);

    waitFor(() => {
      const closeLink = screen.getByRole('link', { name: 'Close' });
      fireEvent.click(closeLink);
      expect(screen.getAllByTestId('details')).not.toBeInTheDocument();
    });
  });
});

describe('detailsLoader', async () => {
  it('returns correct data', async () => {
    const request = new Request(
      'http://localhost:5173/?details=ASMA0000288988'
    );
    const response = await detailsLoader({ request });
    expect(response).toHaveProperty('uid');
  });

  it('returns null when incorrect data', async () => {
    const request = new Request('http://localhost:5173/');
    const response = await detailsLoader({ request });
    expect(response).toBe(null);
  });
});
