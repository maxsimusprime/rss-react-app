import { FormDataState } from '../../dto/types';
import { FC } from 'react';
import styles from './Card.module.css';

interface CardProps {
  form: FormDataState;
}

const Card: FC<CardProps> = ({ form }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <img src={form.photo} />
      </div>
      <div>{form.type}</div>
      <div className={styles.field}>
        <span>Name:</span>
        <span className={styles.field__line}></span>
        <span>{form.name}</span>
      </div>
      <div className={styles.field}>
        <span>Age:</span>
        <span className={styles.field__line}></span>
        <span>{form.age}</span>
      </div>
      <div className={styles.field}>
        <span>Email:</span>
        <span className={styles.field__line}></span>
        <span>{form.email}</span>
      </div>
      <div className={styles.field}>
        <span>Password:</span>
        <span className={styles.field__line}></span>
        <span>{form.password}</span>
      </div>
      <div className={styles.field}>
        <span>Country:</span>
        <span className={styles.field__line}></span>
        <span>{form.country}</span>
      </div>
      <div className={styles.field}>
        <span>Gender:</span>
        <span className={styles.field__line}></span>
        <span>{form.gender}</span>
      </div>
    </div>
  );
};

export default Card;
