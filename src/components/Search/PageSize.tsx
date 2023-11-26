import Link from 'next/link';
import { FC } from 'react';

const SearchLimit: FC = () => {
  return (
    <div
      style={{ display: 'flex', columnGap: '10px' }}
      data-testid={'page-size'}
    >
      <span>Page limit</span>
      <Link
        href="/?pageSize=10&pageNumber=0"
        data-testid={'page-size-10'}
      >
        <button>10</button>
      </Link>
      <Link
        href="/?pageSize=20&pageNumber=0"
        data-testid={'page-size-20'}
      >
        <button>20</button>
      </Link>
      <Link
        href="/?pageSize=50&pageNumber=0"
        data-testid={'page-size-50'}
      >
        <button>50</button>
      </Link>
    </div>
  );
};

export default SearchLimit;
