import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'classic', // "classic" | "symbiote"
  universe: 'earth-dev',
  reducedMotion: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'classic' ? 'symbiote' : 'classic';
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
    setUniverse: (state, action) => {
      state.universe = action.payload;
    },
    toggleReducedMotion: (state) => {
      state.reducedMotion = !state.reducedMotion;
    },
  },
});

export const { toggleTheme, setTheme, setUniverse, toggleReducedMotion } = themeSlice.actions;
export default themeSlice.reducer;
