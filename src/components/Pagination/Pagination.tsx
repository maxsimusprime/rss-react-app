import type { Page } from '../../dto/types';
import './Pagination.css';
import { NavLink } from 'react-router-dom';

export default function Pagination({ page }: { page: Page }) {
  if (page) {
    return (
      <div className="pagination" data-testid={'pagination'}>
        {page.firstPage ? (
          <span className="control">{'<'}</span>
        ) : (
          <NavLink
            className="control"
            to={`?page=${Number(page.pageNumber) - 1}`}
          >
            {'<'}
          </NavLink>
        )}
        <span className="current">{page.pageNumber}</span>
        {page.lastPage ? (
          <span className="control">{'>'}</span>
        ) : (
          <NavLink
            className="control"
            to={`?page=${Number(page.pageNumber) + 1}`}
            data-testid={'next-page'}
          >
            {'>'}
          </NavLink>
        )}
      </div>
    );
  }
}
