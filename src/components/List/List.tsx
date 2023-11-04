import type { AstronomicalObject } from '../../dto/types';
import Item from '../Item/Item';
import './list.css';

export default function List(props: { items: AstronomicalObject[] }) {
  const { items } = props;

  return (
    <div className="list">
      {items.length <= 0
        ? 'Items Not Found'
        : items.map((item) => <Item {...item} key={item.uid} />)}
    </div>
  );
}
