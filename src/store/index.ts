// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import movieReducer from './movieSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer,
  },
});

// Optional: Define RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
