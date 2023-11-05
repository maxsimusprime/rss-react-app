import './item.css';
import type { AstronomicalObject } from '../../dto/types';
import { NavLink, useLocation } from 'react-router-dom';
import Image from './Image';

export default function Item(props: AstronomicalObject) {
  const { uid, name, astronomicalObjectType } = props;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  if (params.has('details')) params.delete('details');
  params.append('details', uid);

  return (
    <NavLink to={`?${params.toString()}`}>
      <div className="item">
        <div className="item__logo">
          <Image astronomicalObjectType={astronomicalObjectType} />
        </div>
        <div className="item__title">name:</div>
        <div className="item__title">{name}</div>
        <div className="item__desc">description:</div>
        <div className="item__desc">{astronomicalObjectType}</div>
      </div>
    </NavLink>
  );
}
