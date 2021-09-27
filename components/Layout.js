import Head from './Head';
import styles from '../styles/Layout.module.scss';

export default function Layout({ children }) {
  return (
    <div>
      <Head />
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Pizza Home</h1>
        </div>
        <nav className={styles.nav}>
          <a className={styles.link} href='/'>
            Home
          </a>
          <a className={styles.link} href='#'>
            About
          </a>
          <a className={styles.link} href='#'>
            Login/Register
          </a>
        </nav>
      </header>
      {children}
    </div>
  );
}
    