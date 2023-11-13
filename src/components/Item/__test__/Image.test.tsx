import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import Image from '../Image';
import { imageSrc } from '../Image';

describe('Image component', () => {
  it('renders correctly', async () => {
    render(<Image astronomicalObjectType={'COMET'} />);
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/assets/images/comet.png'
    );
  });
});

describe('imageSrc', () => {
  it('returns correct url path', async () => {
    expect(imageSrc('GALAXY')).toEqual('/assets/images/galaxy.png');
    expect(imageSrc('NEBULA')).toEqual('/assets/images/nebula.png');
    expect(imageSrc('PLANET')).toEqual('/assets/images/planet.png');
    expect(imageSrc('REGION')).toEqual('/assets/images/region.png');
    expect(imageSrc('SECTOR')).toEqual('/assets/images/sector.png');
    expect(imageSrc('STAR_SYSTEM')).toEqual('/assets/images/star-system.png');
  });
});
