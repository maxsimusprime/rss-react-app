import './item.css';
import type {
  AstronomicalObject,
  AstronomicalObjectType,
} from '../../dto/types';

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

export default function Item(props: AstronomicalObject) {
  const { name, astronomicalObjectType } = props;

  return (
    <div className="item">
      <div className="item__logo">
        <img
          src={imageSrc(astronomicalObjectType)}
          alt="item-logo"
          className="item__image"
        />
      </div>
      <div className="item__title">name:</div>
      <div className="item__title">{name}</div>
      <div className="item__desc">description:</div>
      <div className="item__desc">{astronomicalObjectType}</div>
    </div>
  );
}
