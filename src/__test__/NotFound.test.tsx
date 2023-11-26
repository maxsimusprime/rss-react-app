import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import App from '../pages/404';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

describe('Page 404', () => {
  it('displays when navigating to an invalid route', async () => {
    mockRouter.push('/some/bad/route');
    render(<App />, { wrapper: MemoryRouterProvider });

    await waitFor(() => {
      expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    });
  });
});
