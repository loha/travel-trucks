import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById } from '../../store/campersSlice';
import Features from '../../components/Features/Features';
import Reviews from '../../components/Reviews/Reviews';
import BookingForm from '../../components/BookingForm/BookingForm';
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5L9.5 6.5H14.5L10.5 9.5L12 14.5L8 11.5L4 14.5L5.5 9.5L1.5 6.5H6.5L8 1.5Z" fill="#FFC531" stroke="#FFC531" strokeWidth="1"/>
              </svg>
              <span className={styles.ratingText}>
                {currentCamper.rating} ({currentCamper.reviews?.length || 0} Reviews)
              </span>
            </div>
            <div className={styles.location}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0C5.243 0 3 2.243 3 5C3 8.5 8 14 8 14C8 14 13 8.5 13 5C13 2.243 10.757 0 8 0ZM8 7C6.895 7 6 6.105 6 5C6 3.895 6.895 3 8 3C9.105 3 10 3.895 10 5C10 6.105 9.105 7 8 7Z" fill="#101828"/>
              </svg>
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
