import './Pagination.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';

export default function Pagination() {
  const { page } = useContext(AppContext);

  return (
    <div className="pagination" data-testid={'pagination'}>
      {page && page?.firstPage ? (
        <span className="control">{'<'}</span>
      ) : (
        <NavLink
          className="control"
          to={`?page=${Number(page?.pageNumber) - 1}`}
        >
          {'<'}
        </NavLink>
      )}
      <span className="current">{page?.pageNumber}</span>
      {page?.lastPage ? (
        <span className="control">{'>'}</span>
      ) : (
        <NavLink
          className="control"
          to={`?page=${Number(page?.pageNumber) + 1}`}
          data-testid={'next-page'}
        >
          {'>'}
        </NavLink>
      )}
    </div>
  );
}
