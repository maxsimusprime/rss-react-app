import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import Pagination from '../components/Pagination/Pagination';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { page } from '../mocks/objects';
import { Page } from '../dto/types';

const setupMemoryRouter = (page: Page) =>
  createMemoryRouter(
    [
      {
        path: '/',
        element: <Pagination page={page} />,
        children: [],
      },
    ],
    { initialEntries: ['/?page=0'] }
  );

describe('Pagination component', () => {
  it('updates URL query parameter when page changes', async () => {
    const memoryRouter = setupMemoryRouter(page);
    render(<RouterProvider router={memoryRouter} />);

    const searchParams = new URLSearchParams(
      memoryRouter.state.location.search
    );

    const initialPageNumber = Number(searchParams.get('page'));

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(initialPageNumber).toBe(0);

    const nextPageLink = screen.getByRole('link', { name: '>' });
    expect(nextPageLink.getAttribute('href')).toBe('/?page=1');
    fireEvent.click(nextPageLink);

    await waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
      const newSearchParams = new URLSearchParams(
        memoryRouter.state.location.search
      );
      const newPageNumber = newSearchParams.get('page');
      expect(Number(newPageNumber)).toBe(1);
    });
  });

  it('left arrow link disabled because first page', () => {
    const memoryRouter = setupMemoryRouter(page);
    render(<RouterProvider router={memoryRouter} />);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    const prevPageLink = screen.getByText('<');
    expect(prevPageLink instanceof HTMLSpanElement).toBeTruthy();
  });

  it('right arrow link enabled because first page', () => {
    const memoryRouter = setupMemoryRouter(page);
    render(<RouterProvider router={memoryRouter} />);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    const nextPageLink = screen.getByRole('link', { name: '>' });
    expect(nextPageLink.getAttribute('href')).toBe('/?page=1');
  });

  it('left arrow link enabled because last page', () => {
    const lastPage = Object.assign({
      ...page,
      ...{ firstPage: false, lastPage: true, pageNumber: 2 },
    });
    const memoryRouter = setupMemoryRouter(lastPage);
    render(<RouterProvider router={memoryRouter} />);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    const prevPageLink = screen.getByRole('link', { name: '<' });
    expect(prevPageLink.getAttribute('href')).toBe('/?page=1');
  });

  it('right arrow link disabled because last page', () => {
    const lastPage = Object.assign({
      ...page,
      ...{ firstPage: false, lastPage: true, pageNumber: 2 },
    });
    const memoryRouter = setupMemoryRouter(lastPage);
    render(<RouterProvider router={memoryRouter} />);

    const nextPageLink = screen.getByText('>');
    expect(nextPageLink instanceof HTMLSpanElement).toBeTruthy();
  });
});
