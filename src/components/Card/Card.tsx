import { FormDataState } from '../../dto/types';
import { FC } from 'react';
import styles from './Card.module.css';
import { Countries } from '../../dto/types';

interface CardProps {
  form: FormDataState;
  isNew: boolean;
}

const Card: FC<CardProps> = ({ form, isNew }) => {
  const cardClassName = isNew ? styles.card_new : styles.card;

  return (
    <div className={cardClassName}>
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
        <span>{Countries[form.country]}</span>
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
