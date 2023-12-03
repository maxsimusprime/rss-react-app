import { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout: FC = () => {
  return (
    <>
      <header className={styles.header}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
          to="/"
        >
          Main
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
          to="/controlled"
        >
          Controlled
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
          to="/uncontrolled"
        >
          Uncontrolled
        </NavLink>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
