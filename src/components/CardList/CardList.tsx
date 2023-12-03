import { FormDataState } from '../../dto/types';
import { FC } from 'react';
import Card from '../Card/Card';
import styles from './CardList.module.css';

interface CardList {
  forms: FormDataState[];
}

const CardList: FC<CardList> = ({ forms }) => {
  return (
    <div className={styles.list}>
      {forms.map((form, index) => (
        <Card isNew={forms.length === index + 1} form={form} key={`${Math.random()}`} />
      ))}
    </div>
  );
};

export default CardList;
