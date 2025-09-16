// src/redux/cabbookingSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Simple persistence so refresh on /cab-payment still works
const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem("cabBookingData");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (data) => {
  try {
    if (data) {
      localStorage.setItem("cabBookingData", JSON.stringify(data));
    } else {
      localStorage.removeItem("cabBookingData");
    }
  } catch {}
};

const cabBookingSlice = createSlice({
  name: "cabBooking",
  initialState: {
    bookingData: loadFromStorage(),
  },
  reducers: {
    setBookingData: (state, action) => {
      state.bookingData = action.payload;
      saveToStorage(action.payload);
    },
    clearBookingData: (state) => {
      state.bookingData = null;
      saveToStorage(null);
    },
  },
});

export const { setBookingData, clearBookingData } = cabBookingSlice.actions;
export default cabBookingSlice.reducer;
