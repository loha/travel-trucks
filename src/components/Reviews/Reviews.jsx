import Icon from '../Icon/Icon';
import styles from './Reviews.module.css';

const Reviews = ({ reviews }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Icon
        key={index}
        name={index < rating ? 'star-active' : 'star'}
        width={16}
        height={16}
        fill="none"
        stroke="none"
        className={styles.star}
      />
    ));
  };

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={styles.reviews}>
      {reviews.length === 0 ? (
        <div className={styles.noReviews}>No reviews yet</div>
      ) : (
        <div className={styles.reviewsList}>
          {reviews.map((review, index) => (
            <div key={index} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <div className={styles.avatar}>
                  {getInitials(review.reviewer_name)}
                </div>
                <div className={styles.reviewerInfo}>
                  <h4 className={styles.reviewerName}>{review.reviewer_name}</h4>
                  <div className={styles.rating}>
                    {renderStars(review.reviewer_rating)}
                  </div>
                </div>
              </div>
              <p className={styles.reviewComment}>{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
