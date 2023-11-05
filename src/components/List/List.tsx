import { useLocation, useNavigate } from 'react-router-dom';
import type { AstronomicalObject, Page } from '../../dto/types';
import Item from '../Item/Item';
import Pagination from '../Pagination/Pagination';
import styles from './list.module.css';
import type { MouseEvent } from 'react';

export default function List(props: {
  items: AstronomicalObject[];
  page: Page | undefined;
}) {
  const { items, page } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const listClickHandle = (e: MouseEvent) => {
    e.preventDefault();
    const closeLink = new URLSearchParams(location.search);
    const target = e.target;

    if (target instanceof HTMLDivElement && closeLink.has('details')) {
      closeLink.delete('details');
      navigate(`/?${closeLink.toString()}`);
    }
  };

  return (
    <div className={styles.wrapper} onClick={(e) => listClickHandle(e)}>
      {page && page.totalElements > 0 && <Pagination page={page} />}
      <div className={styles.list}>
        {items.length <= 0
          ? 'Items Not Found'
          : items.map((item) => <Item {...item} key={item.uid} />)}
      </div>
    </div>
  );
}
