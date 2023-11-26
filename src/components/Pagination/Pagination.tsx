import { FC } from 'react';
import type { Page } from '@/dto/types';
import styles from './Pagination.module.css';
import Link from 'next/link';

const Pagination: FC<Page> = ({
  pageNumber,
  firstPage,
  lastPage,
  pageSize,
}) => {
  return (
    <div className={styles.pagination} data-testid={'pagination'}>
      {firstPage ? (
        <span className={styles.control}>{'<'}</span>
      ) : (
        <Link
          className={styles.control}
          href={`/?pageSize=${pageSize}&pageNumber=${
            Number(pageNumber) - 1
          }`}
        >
          {'<'}
        </Link>
      )}
      <span className={styles.current}>{pageNumber}</span>
      {lastPage ? (
        <span className={styles.control}>{'>'}</span>
      ) : (
        <Link
          className={styles.control}
          href={`/?pageSize=${pageSize}&pageNumber=${
            Number(pageNumber) + 1
          }`}
          data-testid={'next-page'}
        >
          {'>'}
        </Link>
      )}
    </div>
  );
};

export default Pagination;
