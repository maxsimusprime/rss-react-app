import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import Pagination from '../components/Pagination/Pagination';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

const memoryRouter = createMemoryRouter(
  [
    {
      path: '/',
      element: <Pagination />,
      children: [],
    },
  ],
  { initialEntries: ['/?page=0'] }
);

describe('Pagination component', () => {
  it('updates URL query parameter when page changes', async () => {
    render(<RouterProvider router={memoryRouter} />);

    const { search } = memoryRouter.state.location;
    const searchParams = new URLSearchParams(search);

    const initialPageNumber = Number(searchParams.get('page'));

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(initialPageNumber).toBe(0);

    const nextPageLink = screen.getByRole('link', { name: '>' });
    fireEvent.click(nextPageLink);

    waitFor(() => {
      const newSearchParams = new URLSearchParams(search);
      const newPageNumber = newSearchParams.get('page');
      expect(Number(newPageNumber)).toBe(1);
    });
  });
});
