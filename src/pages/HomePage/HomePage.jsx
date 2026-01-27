import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewCatalog = () => {
    navigate('/catalog');
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.subtitle}>You can find everything you want in our catalog</p>
          <button className={styles.ctaButton} onClick={handleViewCatalog}>
            View Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
