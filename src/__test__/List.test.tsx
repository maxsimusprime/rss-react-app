import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import List from '../components/List/List';
import { MemoryRouter } from 'react-router-dom';
import { astronomicalObjects, page } from '../mocks/objects';

const { mockedContext } = vi.hoisted(() => {
  return { mockedContext: vi.fn() };
});

vi.mock('react-router-dom', async (importOriginal) => {
  const module: object = await importOriginal();
  return {
    ...module,
    useLoaderData: vi.fn(),
  };
});

vi.mock('react', async (importOriginal) => {
  const module: object = await importOriginal();
  return {
    ...module,
    useContext: mockedContext,
  };
});

describe('List (Card List) component', () => {
  it('component renders the specified number of cards', async () => {
    mockedContext.mockReturnValue({
      items: astronomicalObjects,
      page,
    });
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    const countOfItemsOnPage = 10;

    const items = screen
      .getAllByRole('link')
      .filter((item) => item.classList.contains('item__link'));

    expect(items.length).toBe(countOfItemsOnPage);
  });

  it('appropriate message is displayed if no cards are present', async () => {
    mockedContext.mockReturnValue({
      items: [],
      page: { totalElements: 0 },
    });
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    expect(screen.getByText('Items Not Found')).toBeInTheDocument();
  });
});
