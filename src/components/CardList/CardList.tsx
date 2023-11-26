import { FC } from 'react';
import styles from './CardList.module.css';
import Card from '../Card/Card';
import Pagination from '@/components/Pagination/Pagination';
import { AstronomicalObjectBaseResponse } from '@/dto/types';

const CardList: FC<AstronomicalObjectBaseResponse> = ({
  astronomicalObjects,
  page,
}) => {
  if (!astronomicalObjects) {
    return <div>No Items To Display</div>;
  }

  return (
    <div className={styles.wrapper} /* onClick={(e) => listClickHandle(e)} */>
      {page && page.numberOfElements > 0 && <Pagination {...page} />}
      <div className={styles.list}>
        {astronomicalObjects.length <= 0 ? (
          <div>No Items To Display</div>
        ) : (
          astronomicalObjects?.map((astronomicalObject) => (
            <Card {...astronomicalObject} key={astronomicalObject.uid} />
          ))
        )}
      </div>
    </div>
  );
};

export default CardList;
