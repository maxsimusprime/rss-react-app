import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import ErrorButton from '../components/ErrorButton/ErrorButton';
import { exec } from 'node:child_process';
import util from 'node:util';

describe('ErrorButton component', () => {
  it('renders correctly', async () => {
    render(<ErrorButton />);

    const errorButton = screen.getByTestId('error-button');
    expect(errorButton).toBeInTheDocument();
  });

  it.fails('throw error', async () => {
    const asyncExec = util.promisify(exec);
    vi.mocked(asyncExec).mockRejectedValueOnce(new Error());
    render(<ErrorButton />);

    const errorButton = screen.getByTestId('error-button');
    await expect(fireEvent.click(errorButton)).rejects.toThrowError();
  });
});
