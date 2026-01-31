import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`${styles.header} ${isHomePage ? styles.headerHome : styles.headerOther}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          TravelTrucks
        </Link>
        <nav className={styles.nav}>
          <Link 
            to="/" 
            className={`${styles.navLink} ${location.pathname === '/' ? styles.navLinkActive : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/catalog" 
            className={`${styles.navLink} ${location.pathname.startsWith('/catalog') ? styles.navLinkActive : ''}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
