import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../Loading';

describe('Loading component', () => {
  it('renders correctly', () => {
    render(<Loading />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
