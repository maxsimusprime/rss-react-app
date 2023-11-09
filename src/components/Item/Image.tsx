import { AstronomicalObjectType } from '../../dto/types';
import styles from './Image.module.css';

const imageSrc = (type: AstronomicalObjectType): string => {
  switch (type) {
    case 'COMET':
      return '/assets/images/comet.png';
    case 'GALAXY':
      return '/assets/images/galaxy.png';
    case 'NEBULA':
      return '/assets/images/nebula.png';
    case 'PLANET':
      return '/assets/images/planet.png';
    case 'REGION':
      return '/assets/images/region.png';
    case 'SECTOR':
      return '/assets/images/sector.png';
    case 'STAR_SYSTEM':
      return '/assets/images/star-system.png';
    default:
      return '/assets/images/galaxy.png';
  }
};

export default function Image({
  astronomicalObjectType,
}: {
  astronomicalObjectType: AstronomicalObjectType;
}) {
  return (
    <img
      src={imageSrc(astronomicalObjectType)}
      alt="item-logo"
      className={styles.image}
    />
  );
}
