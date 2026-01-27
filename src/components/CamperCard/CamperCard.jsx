import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/favoritesSlice';
import styles from './CamperCard.module.css';

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.includes(camper.id);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(camper.id));
  };

  const handleShowMore = () => {
    window.open(`/catalog/${camper.id}`, '_blank');
  };

  const formatPrice = (price) => {
    return `€${Number(price).toFixed(2)}`;
  };

  const getFeatures = () => {
    const features = [];
    if (camper.transmission) features.push({ icon: '⚙️', label: camper.transmission });
    if (camper.engine) features.push({ icon: '⛽', label: camper.engine });
    if (camper.AC) features.push({ icon: '❄️', label: 'AC' });
    if (camper.bathroom) features.push({ icon: '🚿', label: 'Bathroom' });
    if (camper.kitchen) features.push({ icon: '🍳', label: 'Kitchen' });
    if (camper.TV) features.push({ icon: '📺', label: 'TV' });
    if (camper.radio) features.push({ icon: '📻', label: 'Radio' });
    if (camper.refrigerator) features.push({ icon: '🧊', label: 'Refrigerator' });
    if (camper.microwave) features.push({ icon: '📟', label: 'Microwave' });
    if (camper.gas) features.push({ icon: '🔥', label: 'Gas' });
    if (camper.water) features.push({ icon: '💧', label: 'Water' });
    return features;
  };

  return (
    <div className={styles.camperCard}>
      <div className={styles.imageContainer}>
        <img 
          src={camper.gallery?.[0]?.thumb || '/placeholder.jpg'} 
          alt={camper.name}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{camper.name}</h2>
          <div className={styles.priceAndFavorite}>
            <span className={styles.price}>{formatPrice(camper.price)}</span>
            <button 
              className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
              onClick={handleFavoriteClick}
              aria-label="Add to favorites"
            >
              <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
                <path 
                  d="M13 21.75L11.5525 20.4525C6.4 15.8138 3 12.6938 3 8.8875C3 5.7675 5.42 3.375 8.5 3.375C10.24 3.375 11.91 4.1775 13 5.43C14.09 4.1775 15.76 3.375 17.5 3.375C20.58 3.375 23 5.7675 23 8.8875C23 12.6938 19.6 15.8138 14.4475 20.4525L13 21.75Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill={isFavorite ? 'currentColor' : 'none'}
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.rating}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5L9.5 6.5H14.5L10.5 9.5L12 14.5L8 11.5L4 14.5L5.5 9.5L1.5 6.5H6.5L8 1.5Z" fill="#FFC531" stroke="#FFC531" strokeWidth="1"/>
            </svg>
            <span className={styles.ratingText}>
              {camper.rating} ({camper.reviews?.length || 0} Reviews)
            </span>
          </div>
          <div className={styles.location}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 0C5.243 0 3 2.243 3 5C3 8.5 8 14 8 14C8 14 13 8.5 13 5C13 2.243 10.757 0 8 0ZM8 7C6.895 7 6 6.105 6 5C6 3.895 6.895 3 8 3C9.105 3 10 3.895 10 5C10 6.105 9.105 7 8 7Z" fill="#101828"/>
            </svg>
            <span>{camper.location}</span>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {getFeatures().slice(0, 6).map((feature, index) => (
            <div key={index} className={styles.feature}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" fill="#101828"/>
              </svg>
              <span>{feature.label}</span>
            </div>
          ))}
        </div>

        <button className={styles.showMoreButton} onClick={handleShowMore}>
          Show more
        </button>
      </div>
    </div>
  );
};

export default CamperCard;
