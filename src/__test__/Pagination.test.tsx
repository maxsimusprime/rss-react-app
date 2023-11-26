import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import Pagination from '../components/Pagination/Pagination';
import { page } from '../mocks/objects';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

describe('Pagination component', () => {
  it('renders correctly', () => {
    mockRouter.push('/?pageSize=0&pageNumber=0');
    render(<Pagination {...page} />, { wrapper: MemoryRouterProvider });
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('updates URL query parameter when page changes', async () => {
    mockRouter.push('/?pageSize=0&pageNumber=0');
    render(<Pagination {...page} />, { wrapper: MemoryRouterProvider });

    const nextPageLink = screen.getByRole('link', { name: '>' });
    expect(nextPageLink.getAttribute('href')).toBe(
      '/?pageSize=10&pageNumber=1'
    );

    fireEvent.click(nextPageLink);
    expect(mockRouter.asPath).toBe('/?pageSize=10&pageNumber=1');
  });

  it('left arrow link disabled because first page', () => {
    mockRouter.push('/?pageSize=0&pageNumber=0');
    render(<Pagination {...page} />, { wrapper: MemoryRouterProvider });

    const prevPageLink = screen.getByText('<');
    expect(prevPageLink instanceof HTMLSpanElement).toBeTruthy();
  });

  it('right arrow link enabled because first page', () => {
    mockRouter.push('/?pageSize=10&pageNumber=0');
    render(<Pagination {...page} />, { wrapper: MemoryRouterProvider });

    const nextPageLink = screen.getByRole('link', { name: '>' });
    expect(nextPageLink instanceof HTMLAnchorElement).toBeTruthy();
  });

  it('left arrow link enabled because last page', () => {
    const lastPage = Object.assign({
      ...page,
      ...{ firstPage: false, lastPage: true, pageNumber: 2 },
    });

    mockRouter.push('/?pageSize=10&pageNumber=1');
    render(<Pagination {...lastPage} />, { wrapper: MemoryRouterProvider });

    const prevPageLink = screen.getByRole('link', { name: '<' });
    expect(prevPageLink instanceof HTMLAnchorElement).toBeTruthy();
  });

  it('right arrow link disabled because last page', () => {
    const lastPage = Object.assign({
      ...page,
      ...{ firstPage: false, lastPage: true, pageNumber: 2 },
    });

    mockRouter.push('/?pageSize=10&pageNumber=1');
    render(<Pagination {...lastPage} />, { wrapper: MemoryRouterProvider });

    const nextPageLink = screen.getByText('>');
    expect(nextPageLink instanceof HTMLSpanElement).toBeTruthy();
  });
});
