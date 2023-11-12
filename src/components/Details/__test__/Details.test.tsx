import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Details from '../Details';
import { MemoryRouter } from 'react-router-dom';
import astronomicalObject from '../../../mocks/astronomicalObject';
import { detailsLoader } from '../Details';

const { mockedUseNavigation } = vi.hoisted(() => {
  return { mockedUseNavigation: vi.fn() }
});

vi.mock('react-router-dom', async (importOriginal) => {
  const module: object = await importOriginal();
  return {
    ...module,
    useLoaderData: () => astronomicalObject,
    useNavigation: mockedUseNavigation,
  };
});

describe('Details component', async () => {
  it('renders <Loading/> when data fetching', () => {
    mockedUseNavigation.mockReturnValue({ state: 'loading' });
    render(
      <MemoryRouter initialEntries={[ '/?page=3&details=ASMA0000288988' ]}>
        <Details />
      </MemoryRouter>
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', '/assets/images/spinner.gif');
  });

  it('renders correctly', () => {
    mockedUseNavigation.mockReturnValue({ state: 'idle' });
    render(
      <MemoryRouter initialEntries={[ '/?page=3&details=ASMA0000288988' ]}>
        <Details />
      </MemoryRouter>
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', '/assets/images/star-system.png');
    expect(screen.getByRole('link', { name: 'Close'})).toHaveAttribute('href', '/?page=3');  
  });
});

describe('detailsLoader', async () => {
  it('returns correct data', async () => {
    const request = new Request('http://localhost:5173/?details=ASMA0000288988');
    const response = await detailsLoader({ request });
    expect(response).toHaveProperty('uid');
  });

  it('returns null wen incorrect data', async () => {
    const request = new Request('http://localhost:5173/');
    const response = await detailsLoader({ request });
    expect(response).toBe(null);
  });
});