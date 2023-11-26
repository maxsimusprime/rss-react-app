import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import CardLogo from '@/components/Card/CardLogo';
import { imageSrc } from '@/components/Card/CardLogo';

describe('Image component', () => {
  it('renders correctly', async () => {
    render(<CardLogo astronomicalObjectType={'COMET'} />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'card-logo');
  });
});

describe('imageSrc', () => {
  it('returns correct url path', async () => {
    expect(imageSrc('GALAXY')).toEqual('/public/assets/images/galaxy.png');
    expect(imageSrc('NEBULA')).toEqual('/public/assets/images/nebula.png');
    expect(imageSrc('PLANET')).toEqual('/public/assets/images/planet.png');
    expect(imageSrc('REGION')).toEqual('/public/assets/images/region.png');
    expect(imageSrc('SECTOR')).toEqual('/public/assets/images/sector.png');
    expect(imageSrc('STAR_SYSTEM')).toEqual(
      '/public/assets/images/star-system.png'
    );
  });
});
