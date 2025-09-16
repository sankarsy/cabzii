// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!token,
    token: token || null,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
