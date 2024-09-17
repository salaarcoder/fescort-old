// src/store/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '../interfaces';

interface MovieState {
  data: IMovie[];
  lastCreatedAt: any;
  activeData: any;
}


const initialState: MovieState = {
  data: [],
  lastCreatedAt: undefined,
  activeData: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    addMovieData: (state, action: PayloadAction<{ data: IMovie[]; lastCreatedAt: number }>) => {
      state.data = [...state.data, ...action.payload.data];
      state.lastCreatedAt = action.payload.lastCreatedAt;
    },
    resetMovieData: (state) => {
      state.data = [];
      state.lastCreatedAt = undefined;
    },
    updateMovieData: (state, action: PayloadAction<{ videoId: string, updateData: { [key: string]: any } }>) => {
      const { videoId, updateData } = action.payload;
      const index = state.data.findIndex(movie => movie.videoId === videoId);
      if (index !== -1) {
        // Update only the specific properties
        state.data[index] = {
          ...state.data[index], // Keep the existing properties
          ...updateData         // Merge with the updated properties
        };
      }
    },
    setActiveMovieData: (state, action: PayloadAction<{ activeData: IMovie; }>) => {
      state.activeData = action.payload.activeData;
    },
    resetActiveMovieData: (state) => {
      state.activeData = null;
    },
  },
});

export const { addMovieData, resetMovieData, setActiveMovieData, resetActiveMovieData, updateMovieData } = movieSlice.actions;
export default movieSlice.reducer;
