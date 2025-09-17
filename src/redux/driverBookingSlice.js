import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingData: null,
};

const driverBookingSlice = createSlice({
  name: "driverBooking",
  initialState,
  reducers: {
    setDriverBookingData(state, action) {
      state.bookingData = action.payload;
    },
    clearDriverBookingData(state) {
      state.bookingData = null;
    },
  },
});

export const { setDriverBookingData, clearDriverBookingData } = driverBookingSlice.actions;
export default driverBookingSlice.reducer;
