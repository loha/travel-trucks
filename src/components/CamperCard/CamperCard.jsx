import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/favoritesSlice';
import Icon from '../Icon/Icon';
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
    if (camper.transmission) features.push({ icon: 'transmission', label: camper.transmission });
    if (camper.engine) features.push({ icon: 'gas', label: camper.engine });
    if (camper.AC) features.push({ icon: 'AC', label: 'AC' });
    if (camper.bathroom) features.push({ icon: 'bathroom', label: 'Bathroom' });
    if (camper.kitchen) features.push({ icon: 'kitchen', label: 'Kitchen' });
    if (camper.TV) features.push({ icon: 'TV', label: 'TV' });
    if (camper.radio) features.push({ icon: 'radio', label: 'Radio' });
    if (camper.refrigerator) features.push({ icon: 'refrigerator', label: 'Refrigerator' });
    if (camper.microwave) features.push({ icon: 'microwave', label: 'Microwave' });
    if (camper.gas) features.push({ icon: 'gas', label: 'Gas' });
    if (camper.water) features.push({ icon: 'water', label: 'Water' });
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
              <Icon 
                name={isFavorite ? 'star-active' : 'star'} 
                width={26} 
                height={24} 
                fill="none"
                stroke="none"
              />
            </button>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.rating}>
            <Icon name="star-active" width={16} height={16} fill="none" stroke="none" />
            <span className={styles.ratingText}>
              {camper.rating} ({camper.reviews?.length || 0} Reviews)
            </span>
          </div>
          <div className={styles.location}>
            <Icon name="map" width={16} height={16} stroke="none" fill="none" />
            <span>{camper.location}</span>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {getFeatures().slice(0, 6).map((feature, index) => (
            <div key={index} className={styles.feature}>
              <Icon name={feature.icon} width={20} height={20} stroke="none" fill="none" />
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
