import styles from './Details.module.css';
import CardLogo from '@/components/Card/CardLogo';
import Loading from '@/components/_ui/bars/Loading/Loading';
import { useGetItemByIdQuery } from '@/services/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface DetailsProps {
  uid: string;
}

const Details: FC<DetailsProps> = ({ uid }) => {
  const result = useGetItemByIdQuery(uid);
  const { isLoading, error, data } = result;

  const router = useRouter();
  const query = Object.assign({}, { ...router.query });
  let linkHref = '/';
  if (query.query === 'search') {
    delete query.query;
    linkHref += 'search';
  }
  delete query.details;
  const queryString = Object.keys(query)
    .map((key) => key + '=' + query[key])
    .join('&');

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error While Getting Details Data</div>;
  }

  return (
    <div className={styles.details} data-testid="details">
      {data && (
        <div className={styles.details__content}>
          {data.astronomicalObject.astronomicalObjectType && (
            <CardLogo
              astronomicalObjectType={
                data.astronomicalObject.astronomicalObjectType
              }
            />
          )}
          {data.astronomicalObject.name && <div>Details:</div>}
          {data.astronomicalObject.name && (
            <div>Name: {data.astronomicalObject.name}</div>
          )}
          {data?.astronomicalObject.astronomicalObjectType && (
            <div>Type: {data.astronomicalObject.astronomicalObjectType}</div>
          )}
          {data.astronomicalObject.location?.name && (
            <div>Location: {data.astronomicalObject.location?.name}</div>
          )}
          {data.astronomicalObject.uid && (
            <div>ID: {data.astronomicalObject.uid}</div>
          )}
          <Link
            href={`${linkHref}?${queryString}`}
            data-testid={'details-close'}
          >
            Close
          </Link>
        </div>
      )}
    </div>
  );
};

export default Details;
