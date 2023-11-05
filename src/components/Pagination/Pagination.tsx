import './Pagination.css';
import { NavLink } from 'react-router-dom';
import type { Page } from '../../dto/types';

export default function Pagination({ page }: { page: Page }) {
  return (
    <div className="pagination">
      {page.firstPage ? (
        <span className="control">{'<'}</span>
      ) : (
        <NavLink className="control" to={`?page=${page.pageNumber - 1}`}>
          {'<'}
        </NavLink>
      )}
      <span className="current">{page.pageNumber}</span>
      {page.lastPage ? (
        <span className="control">{'>'}</span>
      ) : (
        <NavLink className="control" to={`?page=${page.pageNumber + 1}`}>
          {'>'}
        </NavLink>
      )}
    </div>
  );
}
