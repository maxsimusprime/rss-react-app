import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loading} data-testid={'loading'}>
      <img src="/assets/images/spinner.gif" alt="spinner" />
    </div>
  );
}
