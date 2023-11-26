import styles from './Card.module.css';
import Link from 'next/link';
import CardLogo from './CardLogo';
import { AstronomicalObject } from '@/dto/types';

import { FC } from 'react';
import { useRouter } from 'next/router';

const Card: FC<AstronomicalObject> = ({
  name,
  astronomicalObjectType,
  uid,
}) => {
  const router = useRouter();
  const query = Object.assign({}, { ...router.query });
  let linkHref = '/';
  if (query.query === 'search') {
    delete query.query;
    linkHref += 'search';
  }
  query.details = uid;
  const queryString = Object.keys(query)
    .map((key) => key + '=' + query[key])
    .join('&');

  return (
    <Link
      href={`${linkHref}?${queryString}`}
      data-testid="card"
      className={'card'}
    >
      <div className={styles.card__content}>
        <div className={styles.card__logo}>
          <CardLogo astronomicalObjectType={astronomicalObjectType} />
        </div>
        <div className={styles.card__title}>name:</div>
        <div className={styles.card__title}>{name}</div>
        <div className={styles.card__desc}>description:</div>
        <div className={styles.card__desc}>{astronomicalObjectType}</div>
      </div>
    </Link>
  );
};

export default Card;
