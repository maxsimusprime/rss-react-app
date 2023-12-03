import { useAppSelector } from '../../hooks/useAppSelector';
import { FC } from 'react';
import CardList from '../CardList/CardList';
import styles from './Dashboard.module.css';

const Dashboard: FC = () => {
  const { forms } = useAppSelector((state) => state.form);

  if (!forms.length) {
    return <>Nothing To Display</>;
  }

  return (
    <div className={styles.dashboard}>
      <CardList forms={forms} />
    </div>
  );
};

export default Dashboard;
