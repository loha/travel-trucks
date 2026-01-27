import { useDispatch, useSelector } from 'react-redux';
import { setLocation, setForm, toggleFeature } from '../../store/filtersSlice';
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
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.locationIcon}>
            <path d="M10 0C6.554 0 3.75 2.804 3.75 6.25C3.75 10.625 10 17.5 10 17.5C10 17.5 16.25 10.625 16.25 6.25C16.25 2.804 13.446 0 10 0ZM10 8.75C8.619 8.75 7.5 7.631 7.5 6.25C7.5 4.869 8.619 3.75 10 3.75C11.381 3.75 12.5 4.869 12.5 6.25C12.5 7.631 11.381 8.75 10 8.75Z" fill="#101828"/>
          </svg>
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
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 8V24M16 8L12 12M16 8L20 12M16 24L12 20M16 24L20 20M8 16H24M8 16L12 12M8 16L12 20M24 16L20 12M24 16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>AC</span>
          </button>

          <button
            type="button"
            className={`${styles.featureButton} ${filters.kitchen ? styles.featureButtonActive : ''}`}
            onClick={(e) => handleFeatureToggle('kitchen', e)}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 6V26H24V6M10 6V12H14V6M18 6V12H22V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Kitchen</span>
          </button>

          <button
            type="button"
            className={`${styles.featureButton} ${filters.TV ? styles.featureButtonActive : ''}`}
            onClick={(e) => handleFeatureToggle('TV', e)}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 28H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>TV</span>
          </button>

          <button
            type="button"
            className={`${styles.featureButton} ${filters.bathroom ? styles.featureButtonActive : ''}`}
            onClick={(e) => handleFeatureToggle('bathroom', e)}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 16H24M8 16C8 12 10 10 12 10C14 10 16 12 16 12M8 16V24C8 26 10 28 12 28H20C22 28 24 26 24 24V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
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
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M4 12H28V22C28 23.1046 27.1046 24 26 24H6C4.89543 24 4 23.1046 4 22V12Z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="9" cy="24" r="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="23" cy="24" r="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Van</span>
          </button>

          <button
            type="button"
            className={`${styles.typeButton} ${filters.form === 'fullyIntegrated' ? styles.typeButtonActive : ''}`}
            onClick={(e) => handleTypeChange('fullyIntegrated', e)}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M4 10H28V22C28 23.1046 27.1046 24 26 24H6C4.89543 24 4 23.1046 4 22V10Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 10V8C8 6.89543 8.89543 6 10 6H22C23.1046 6 24 6.89543 24 8V10" stroke="currentColor" strokeWidth="2"/>
              <circle cx="9" cy="24" r="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="23" cy="24" r="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Fully Integrated</span>
          </button>

          <button
            type="button"
            className={`${styles.typeButton} ${filters.form === 'alcove' ? styles.typeButtonActive : ''}`}
            onClick={(e) => handleTypeChange('alcove', e)}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M4 12H28V22C28 23.1046 27.1046 24 26 24H6C4.89543 24 4 23.1046 4 22V12Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 12V8H22V12" stroke="currentColor" strokeWidth="2"/>
              <circle cx="9" cy="24" r="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="23" cy="24" r="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Alcove</span>
          </button>
        </div>
      </div>

      <button type="submit" className={styles.searchButton}>Search</button>
    </form>
  );
};

export default Filters;
