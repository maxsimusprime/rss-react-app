import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import NotFound from '../components/NotFound/NotFound';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
  },
]);

describe('Page 404 component', () => {
  it('displayed when navigating to an invalid route', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={browserRouter} />
      </Provider>
    );

    await waitFor(() => {
      browserRouter.navigate('/some/bad/route');
      expect(screen.getByTestId('not-found')).toBeInTheDocument();
    });
  });
});
