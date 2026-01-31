import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers, loadMore } from '../../store/campersSlice';
import CamperCard from '../../components/CamperCard/CamperCard';
import Filters from '../../components/Filters/Filters';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error, displayedCount, hasMore } = useSelector((state) => state.campers);
  const hasFetchedRef = useRef(false);
  
  // Load all campers on initial page load (no filters)
  useEffect(() => {
    // Prevent double-fetching in StrictMode
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    
    dispatch(fetchCampers({}));
  }, [dispatch]);

  // Handle form submission
  const handleFiltersSubmit = (filters) => {
    dispatch(fetchCampers(filters));
  };

  const handleLoadMore = () => {
    dispatch(loadMore());
  };

  // Ensure items is an array before slicing
  const displayedCampers = Array.isArray(items) ? items.slice(0, displayedCount) : [];

  return (
    <div className={styles.catalogPage}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <Filters onSubmit={handleFiltersSubmit} />
        </aside>
        
        <main className={styles.mainContent}>
          {loading && items.length === 0 ? (
            <div className={styles.loading}>Loading campers...</div>
          ) : error ? (
            <div className={styles.error}>Error: {error}</div>
          ) : items.length === 0 ? (
            <div className={styles.noResults}>No vehicles found with the selected filters. Please try adjusting your search criteria.</div>
          ) : (
            <>
              <div className={styles.campersList}>
                {displayedCampers.map((camper) => (
                  <CamperCard key={camper.id} camper={camper} />
                ))}
              </div>
              
              {hasMore && displayedCount < items.length && (
                <button 
                  className={styles.loadMoreButton} 
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  Load more
                </button>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;
