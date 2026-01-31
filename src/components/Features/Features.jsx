import Icon from '../Icon/Icon';
import styles from './Features.module.css';

const Features = ({ camper }) => {
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
    <div className={styles.features}>
      <div className={styles.featuresList}>
        {getFeatures().map((feature, index) => (
          <div key={index} className={styles.feature}>
            <Icon name={feature.icon} width={20} height={20} stroke="none" fill="none" />
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
