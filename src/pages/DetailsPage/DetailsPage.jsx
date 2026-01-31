import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById } from '../../store/campersSlice';
import Features from '../../components/Features/Features';
import Reviews from '../../components/Reviews/Reviews';
import BookingForm from '../../components/BookingForm/BookingForm';
import Icon from '../../components/Icon/Icon';
import styles from './DetailsPage.module.css';

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCamper, loading, error } = useSelector((state) => state.campers);
  const [activeTab, setActiveTab] = useState('features');
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // Prevent double-fetching in StrictMode
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (loading) {
    return <div className={styles.loading}>Loading camper details...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!currentCamper) {
    return <div className={styles.error}>Camper not found</div>;
  }

  const formatPrice = (price) => {
    return `€${Number(price).toFixed(2)}`;
  };

  return (
    <div className={styles.detailsPage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>{currentCamper.name}</h1>
          <div className={styles.headerInfo}>
            <div className={styles.rating}>
              <Icon name="star-active" width={16} height={16} fill="none" stroke="none" />
              <span className={styles.ratingText}>
                {currentCamper.rating} ({currentCamper.reviews?.length || 0} Reviews)
              </span>
            </div>
            <div className={styles.location}>
              <Icon name="map" width={16} height={16} stroke="none" fill="none" />
              <span>{currentCamper.location}</span>
            </div>
          </div>
          <div className={styles.price}>{formatPrice(currentCamper.price)}</div>
        </div>

        {/* Gallery */}
        <div className={styles.gallery}>
          {currentCamper.gallery?.map((image, index) => (
            <div key={index} className={styles.galleryItem}>
              <img src={image.thumb} alt={`${currentCamper.name} - ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Description */}
        <p className={styles.description}>{currentCamper.description}</p>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'features' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'reviews' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            {activeTab === 'features' ? (
              <Features camper={currentCamper} />
            ) : (
              <Reviews reviews={currentCamper.reviews || []} />
            )}
          </div>
          <div className={styles.rightColumn}>
            <BookingForm camperId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
