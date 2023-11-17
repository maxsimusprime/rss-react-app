import { useLocation, useNavigate } from 'react-router-dom';
import Item from '../Item/Item';
import Pagination from '../Pagination/Pagination';
import styles from './list.module.css';
import { type MouseEvent } from 'react';
import { api } from '../../services/api';
import Loading from '../_ui/bars/Loading/Loading';
import { useAppSelector } from '../../hooks/useAppSelector';

export default function List() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, pageNumber, pageSize } = useAppSelector(
    (state) => state.item
  );

  const { data, error, isLoading } = api.useGetItemsQuery({
    pageNumber,
    pageSize,
    searchQuery,
  });

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
    <>
      {error && <div>Fetching Data Error</div>}
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.wrapper} onClick={(e) => listClickHandle(e)}>
          {data?.page && data.page.numberOfElements > 0 && (
            <Pagination page={data.page} />
          )}
          <div className={styles.list}>
            {data?.astronomicalObjects && data.astronomicalObjects.length <= 0
              ? 'Items Not Found'
              : data?.astronomicalObjects?.map((item) => (
                  <Item {...item} key={item.uid} />
                ))}
          </div>
        </div>
      )}
    </>
  );
}
