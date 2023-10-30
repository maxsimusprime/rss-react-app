import {Component} from 'react';
import type { AstronomicalObject } from '../dto/types';
import Item from './Item';

export default class extends Component<{ items: AstronomicalObject[] }, object> {
  render() {
    return (
      <div className='list'>
        {
          this.props.items.length <= 0
          ? 'Items Not Found'
          : this.props.items.map((item) => <Item { ...item } key={item.name + Date.now()}/>)
        }
      </div>
    )
  }
}
