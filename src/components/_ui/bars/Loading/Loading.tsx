import styles from './loading.module.css';
import spinner from '@public/assets/images/spinner.gif'
import Image from 'next/image';

export default function Loading() {
  return (
    <div className={styles.loading} data-testid={'loading'}>
      <Image src={spinner} alt="spinner" width={150} height={100}/>
    </div>
  );
}
