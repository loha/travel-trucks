import styles from './Reviews.module.css';

const Reviews = ({ reviews }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className={styles.star}
      >
        <path
          d="M8 1.5L9.5 6.5H14.5L10.5 9.5L12 14.5L8 11.5L4 14.5L5.5 9.5L1.5 6.5H6.5L8 1.5Z"
          fill={index < rating ? '#FFC531' : '#F2F4F7'}
          stroke={index < rating ? '#FFC531' : '#F2F4F7'}
          strokeWidth="1"
        />
      </svg>
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
