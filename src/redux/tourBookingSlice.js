import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingData: null,
};

const tourBookingSlice = createSlice({
  name: "tourBooking",
  initialState,
  reducers: {
    setTourBookingData: (state, action) => {
      state.bookingData = action.payload;
    },
    clearTourBookingData: (state) => {
      state.bookingData = null;
    },
  },
});

export const { setTourBookingData, clearTourBookingData } =
  tourBookingSlice.actions;

export default tourBookingSlice.reducer;
