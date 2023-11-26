import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import PageSize from '../components/Search/PageSize';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

describe('SearchLimit component', () => {
  it('renders correctly and changes pageSize', async () => {
    mockRouter.push('/?pageSize=0&pageNumber=0');

    render(<PageSize />, { wrapper: MemoryRouterProvider });

    expect(screen.getByTestId('page-size')).toBeInTheDocument();

    const pageSize10 = screen.getByTestId('page-size-10');
    const pageSize20 = screen.getByTestId('page-size-20');
    const pageSize50 = screen.getByTestId('page-size-50');

    expect(pageSize10).toBeInTheDocument();
    expect(pageSize20).toBeInTheDocument();
    expect(pageSize50).toBeInTheDocument();

    fireEvent.click(pageSize10);
    expect(mockRouter.asPath).toBe('/?pageSize=10&pageNumber=0');

    fireEvent.click(pageSize20);
    expect(mockRouter.asPath).toBe('/?pageSize=20&pageNumber=0');

    fireEvent.click(pageSize50);
    expect(mockRouter.asPath).toBe('/?pageSize=50&pageNumber=0');
  });
});
