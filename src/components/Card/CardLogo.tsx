import { AstronomicalObjectType } from '@/dto/types';
import styles from './CardLogo.module.css';
import Image from 'next/image';
import comet from '../../../public/assets/images/star-system.png';
import galaxy from '../../../public/assets/images/galaxy.png';
import nebula from '../../../public/assets/images/nebula.png';
import planet from '../../../public/assets/images/planet.png';
import region from '../../../public/assets/images/region.png';
import sector from '../../../public/assets/images/sector.png';
import starSystem from '../../../public/assets/images/star-system.png';

export const imageSrc = (type: AstronomicalObjectType): string => {
  switch (type) {
    case 'COMET':
      return comet;
    case 'GALAXY':
      return galaxy;
    case 'NEBULA':
      return nebula;
    case 'PLANET':
      return planet;
    case 'REGION':
      return region;
    case 'SECTOR':
      return sector;
    case 'STAR_SYSTEM':
      return starSystem;
    default:
      return galaxy;
  }
};

export default function CardLogo({
  astronomicalObjectType,
}: {
  astronomicalObjectType: AstronomicalObjectType;
}) {
  return (
    <Image
      src={imageSrc(astronomicalObjectType)}
      alt="card-logo"
      className={styles.image}
      placeholder={'blur'}
    />
  );
}
