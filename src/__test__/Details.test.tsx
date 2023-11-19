import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import Details from '../components/Details/Details';
import { Outlet, RouterProvider, createMemoryRouter } from 'react-router-dom';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { server } from '../mocks/server';

const memoryRouter = createMemoryRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Outlet context={'ASMA0000288988'} />,
          children: [
            {
              path: '/',
              element: <Details />,
            },
          ],
        },
      ],
    },
  ],
  { initialEntries: ['/?page=3&details=ASMA0000288988'] }
);

describe('Details (Detailed Card) component', async () => {
  it('correctly displays the detailed card data', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={memoryRouter} />
      </Provider>
    );

    await waitFor(() => {
      const details = screen.getByTestId('details');
      expect(details).toBeInTheDocument();
      expect(
        details.innerHTML.match('/assets/images/star-system.png')
      ).toBeTruthy();
      expect(details.innerHTML.match('ASMA0000288988')).toBeTruthy();

      expect(screen.getByRole('link', { name: 'Close' })).toHaveAttribute(
        'href',
        '/?page=3'
      );
    });
  });

  it('clicking the close button hides the component', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={memoryRouter} />
      </Provider>
    );

    await waitFor(() => {
      const details = screen.getByTestId('details');
      expect(details).toBeInTheDocument();
      const closeLink = screen.getByRole('link', { name: 'Close' });
      fireEvent.click(closeLink);
      expect(details).not.toBeInTheDocument();
    });
  });

  it('loading indicator is displayed while fetching data', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={memoryRouter} />
      </Provider>
    );

    server.events.on('request:start', () => {
      expect(screen.getAllByTestId('loading')).toBeInTheDocument();
    });
  });
});
