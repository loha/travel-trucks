import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mockApiService from '../services/mockApiService';

// Async thunk to fetch all campers with client-side filtering
export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async (filters = {}) => {
    try {
      const filteredItems = await mockApiService.filterCampers(filters);
      return filteredItems;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch campers');
    }
  }
);

// Async thunk to fetch a single camper by ID
export const fetchCamperById = createAsyncThunk(
  'campers/fetchCamperById',
  async (id) => {
    try {
      const camper = await mockApiService.getCamperById(id);
      return camper;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch camper details');
    }
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    currentCamper: null,
    loading: false,
    error: null,
    hasMore: true,
    displayedCount: 4, // Show 4 items initially
  },
  reducers: {
    resetCampers: (state) => {
      state.items = [];
      state.displayedCount = 4;
      state.hasMore = true;
    },
    loadMore: (state) => {
      state.displayedCount += 4;
      if (state.displayedCount >= state.items.length) {
        state.hasMore = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.displayedCount = 4; // Reset to show first 4 items
        state.hasMore = action.payload.length > 4;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetCampers, loadMore } = campersSlice.actions;
export default campersSlice.reducer;
