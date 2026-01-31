import { useDispatch, useSelector } from 'react-redux';
import { setLocation, setForm, toggleFeature } from '../../store/filtersSlice';
import Icon from '../Icon/Icon';
import styles from './Filters.module.css';

const Filters = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleLocationChange = (e) => {
    dispatch(setLocation(e.target.value));
  };

  const handleFeatureToggle = (feature, e) => {
    e.preventDefault(); // Prevent form submission
    dispatch(toggleFeature(feature));
  };

  const handleTypeChange = (form, e) => {
    e.preventDefault(); // Prevent form submission
    dispatch(setForm(filters.form === form ? '' : form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(filters);
    }
  };

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <div className={styles.section}>
        <label className={styles.label}>Location</label>
        <div className={styles.locationInput}>
          <Icon name="map" width={20} height={20} stroke="none" fill="none" className={styles.locationIcon} />
          <input
            type="text"
            placeholder="City"
            value={filters.location}
            onChange={handleLocationChange}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Filters</label>
        
        <h3 className={styles.subheading}>Vehicle equipment</h3>
        <div className={styles.separator}></div>
        
        <div className={styles.features}>
          <button
            type="button"
            className={`${styles.featureButton} ${filters.AC ? styles.featureButtonActive : ''}`}
            onClick={(e) => handleFeatureToggle('AC', e)}
          >
            <Icon name="AC" width={32} height={32} stroke="none" fill="none" />
            <span>AC</span>
          </button>

          <button
            type="button"
            className={`${styles.featureButton} ${filters.transmission ? styles.featureButtonActive : ''}`}
            onClick={(e) => handleFeatureToggle('transmission', e)}
          >
            <Icon name="transmission" width={32} height={32} stroke="none" fill="none" />
            <span>Automatic</span>
          </button>

          <button
            type="button"
            className={`${styles.featureButton} ${filters.kitchen ? styles.featureButtonActive : ''}`}
            onClick={(e) => handleFeatureToggle('kitchen', e)}
          >
            <Icon name="kitchen" width={32} height={32} stroke="none" fill="none" />
            <span>Kitchen</span>
          </button>

          <button
            type="button"
            className={`${styles.featureButton} ${filters.TV ? styles.featureButtonActive : ''}`}
            onClick={(e) => handleFeatureToggle('TV', e)}
          >
            <Icon name="TV" width={32} height={32} stroke="none" fill="none" />
            <span>TV</span>
          </button>

          <button
            type="button"
            className={`${styles.featureButton} ${filters.bathroom ? styles.featureButtonActive : ''}`}
            onClick={(e) => handleFeatureToggle('bathroom', e)}
          >
            <Icon name="bathroom" width={32} height={32} stroke="none" fill="none" />
            <span>Bathroom</span>
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.subheading}>Vehicle type</h3>
        <div className={styles.separator}></div>
        
        <div className={styles.types}>
          <button
            type="button"
            className={`${styles.typeButton} ${filters.form === 'panelTruck' ? styles.typeButtonActive : ''}`}
            onClick={(e) => handleTypeChange('panelTruck', e)}
          >
            <Icon name="panelTruck" width={32} height={32} stroke="none" fill="none" />
            <span>Van</span>
          </button>

          <button
            type="button"
            className={`${styles.typeButton} ${filters.form === 'fullyIntegrated' ? styles.typeButtonActive : ''}`}
            onClick={(e) => handleTypeChange('fullyIntegrated', e)}
          >
            <Icon name="fullyIntegrated" width={32} height={32} stroke="none" fill="none" />
            <span>Fully Integrated</span>
          </button>

          <button
            type="button"
            className={`${styles.typeButton} ${filters.form === 'alcove' ? styles.typeButtonActive : ''}`}
            onClick={(e) => handleTypeChange('alcove', e)}
          >
            <Icon name="alcove" width={32} height={32} stroke="none" fill="none" />
            <span>Alcove</span>
          </button>
        </div>
      </div>

      <button type="submit" className={styles.searchButton}>Search</button>
    </form>
  );
};

export default Filters;
