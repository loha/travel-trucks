import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    location: '',
    form: '',
    AC: false,
    transmission: false,
    kitchen: false,
    TV: false,
    bathroom: false,
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    toggleFeature: (state, action) => {
      const feature = action.payload;
      state[feature] = !state[feature];
    },
    resetFilters: (state) => {
      state.location = '';
      state.form = '';
      state.AC = false;
      state.transmission = false;
      state.kitchen = false;
      state.TV = false;
      state.bathroom = false;
    },
  },
});

export const { setLocation, setForm, toggleFeature, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
