import { Component } from 'react';
import type { AstronomicalObject } from '../dto/types';

export default class extends Component<AstronomicalObject, object> {
  constructor(props: AstronomicalObject) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, astronomicalObjectType } = this.props;

    const imageSrc = (type: string): string => {
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
}
