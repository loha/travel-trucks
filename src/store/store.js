import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campersSlice';
import favoritesReducer from './favoritesSlice';
import filtersReducer from './filtersSlice';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});
