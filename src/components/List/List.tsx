import type { AstronomicalObject, Page } from '../../dto/types';
import Item from '../Item/Item';
import Pagination from '../Pagination/Pagination';
import styles from './list.module.css';

export default function List(props: {
  items: AstronomicalObject[];
  page: Page | undefined;
}) {
  const { items, page } = props;

  return (
    <div className={styles.wrapper}>
      {page && page.totalElements > 0 && <Pagination page={page} />}
      <div className={styles.list}>
        {items.length <= 0
          ? 'Items Not Found'
          : items.map((item) => <Item {...item} key={item.uid} />)}
      </div>
    </div>
  );
}
