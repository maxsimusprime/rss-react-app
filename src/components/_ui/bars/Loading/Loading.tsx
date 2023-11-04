import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <img src="/assets/images/spinner.gif" alt="spinner" />
    </div>
  );
}
