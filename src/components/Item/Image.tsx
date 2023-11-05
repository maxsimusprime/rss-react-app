import { AstronomicalObjectType } from '../../dto/types';
import styles from './Image.module.css';

const imageSrc = (type: AstronomicalObjectType): string => {
  switch (type) {
    case 'COMET':
      return '/assets/images/comet.png';
      break;
    case 'GALAXY':
      return '/assets/images/galaxy.png';
      break;
    case 'NEBULA':
      return '/assets/images/nebula.png';
      break;
    case 'PLANET':
      return '/assets/images/planet.png';
      break;
    case 'REGION':
      return '/assets/images/region.png';
      break;
    case 'SECTOR':
      return '/assets/images/sector.png';
      break;
    case 'STAR_SYSTEM':
      return '/assets/images/star-system.png';
      break;
    default:
      return '/assets/images/galaxy.png';
      break;
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
