import styles from './Features.module.css';

const Features = ({ camper }) => {
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
    <div className={styles.features}>
      <div className={styles.featuresList}>
        {getFeatures().map((feature, index) => (
          <div key={index} className={styles.feature}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" fill="#101828"/>
            </svg>
            <span>{feature.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.details}>
        <h3 className={styles.detailsTitle}>Vehicle details</h3>
        <div className={styles.separator}></div>
        <div className={styles.detailsList}>
          {camper.form && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Form</span>
              <span className={styles.detailValue}>{camper.form}</span>
            </div>
          )}
          {camper.length && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Length</span>
              <span className={styles.detailValue}>{camper.length}</span>
            </div>
          )}
          {camper.width && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Width</span>
              <span className={styles.detailValue}>{camper.width}</span>
            </div>
          )}
          {camper.height && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Height</span>
              <span className={styles.detailValue}>{camper.height}</span>
            </div>
          )}
          {camper.tank && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Tank</span>
              <span className={styles.detailValue}>{camper.tank}</span>
            </div>
          )}
          {camper.consumption && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Consumption</span>
              <span className={styles.detailValue}>{camper.consumption}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Features;
