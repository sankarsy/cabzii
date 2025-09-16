import { createSlice } from "@reduxjs/toolkit";

// Simple persistence so refresh on /vehicle-payment still works
const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem("bookingData");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (data) => {
  try {
    if (data) {
      localStorage.setItem("bookingData", JSON.stringify(data));
    } else {
      localStorage.removeItem("bookingData");
    }
  } catch {}
};

const bookingSlice = createSlice({
  name: "booking",
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

export const { setBookingData, clearBookingData } = bookingSlice.actions;
export default bookingSlice.reducer;
