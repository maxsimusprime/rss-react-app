import { useLocation, useNavigate } from 'react-router-dom';
import Item from '../Item/Item';
import Pagination from '../Pagination/Pagination';
import styles from './list.module.css';
import { useContext, type MouseEvent } from 'react';
import { AppContext } from '../../AppContext';

export default function List() {
  const { items, page } = useContext(AppContext);

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
      {page && page.totalElements > 0 && <Pagination />}
      <div className={styles.list}>
        {items && items.length <= 0
          ? 'Items Not Found'
          : items?.map((item) => <Item {...item} key={item.uid} />)}
      </div>
    </div>
  );
}
