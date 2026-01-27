import { useState } from 'react';
import styles from './BookingForm.module.css';

const BookingForm = ({ camperId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.bookingDate) {
      newErrors.bookingDate = 'Booking date is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Show success notification
    alert(`Booking successful!\n\nCamper ID: ${camperId}\nName: ${formData.name}\nEmail: ${formData.email}\nDate: ${formData.bookingDate}`);

    // Reset form
    setFormData({
      name: '',
      email: '',
      bookingDate: '',
      comment: '',
    });
    setErrors({});
  };

  return (
    <div className={styles.bookingForm}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>Stay connected! We are always ready to help you.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name*"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email*"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            placeholder="Booking date*"
            className={`${styles.input} ${styles.dateInput} ${errors.bookingDate ? styles.inputError : ''}`}
          />
          {errors.bookingDate && <span className={styles.error}>{errors.bookingDate}</span>}
        </div>

        <div className={styles.formGroup}>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Comment"
            className={`${styles.textarea}`}
            rows="5"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
