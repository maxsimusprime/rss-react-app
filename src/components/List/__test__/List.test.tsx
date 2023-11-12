import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import List from '../List';
import { MemoryRouter } from 'react-router-dom';
import { astronomicalObjects, page } from '../../../mocks/objects';
import userEvent from '@testing-library/user-event';

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

describe('List component', () => {
  it('renders the specified number of cards', async () => {
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

  it('message is displayed if no cards are present', async () => {
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

describe('Item (Card) component', () => {
  it('clicking on a card opens a detailed card component', async () => {
    mockedContext.mockReturnValue({
      items: astronomicalObjects,
      page,
    });
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    const items = screen
      .getAllByRole('link')
      .filter((item) => item.classList.contains('item__link'));
    
      const item = items[0];
      await userEvent.click(item);
      expect(screen.getByText('Details:')).toBeInTheDocument();
  });
});