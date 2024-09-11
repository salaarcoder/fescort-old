// src/store/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userId: string;
  userName: string;
  userEmail: string;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  userId: '',
  userName: '',
  userEmail: '',
  isLoggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ userId: string; userName: string; userEmail: string; }>) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.userId = '';
      state.userName = '';
      state.userEmail = '';
      state.isLoggedIn = false;
    },
  },
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
