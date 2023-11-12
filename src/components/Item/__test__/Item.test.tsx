import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Item from '../Item';
import astronomicalObject from '../../../mocks/astronomicalObject';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-router-dom', async (importOriginal) => {
  const module: object = await importOriginal();
  return {
    ...module,
    useLocation: () => ({
      search: '?page=1',
    }),
  };
});

describe('Item component', () => {
  it('renders the relevant card data', async () => {
    render(
      <MemoryRouter>
        <Item {...astronomicalObject} />
      </MemoryRouter>
    );
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/?page=1&details=ASMA0000288988'
    );
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/assets/images/star-system.png'
    );
  });
});
