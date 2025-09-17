// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import cartReducer from './cartSlice';
import bookingReducer from "./bookingSlice";
import tourBookingReducer from "./tourBookingSlice";
import cabBookingReducer from "./cabbookingSlice"; // ✅ Import cabBooking slice
import driverBookingReducer from "./driverBookingSlice"; // Import driverBooking slice if needed

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    booking: bookingReducer,
    tourBooking: tourBookingReducer,
    cabBooking: cabBookingReducer, // ✅ Register cabBooking reducer
    driverBooking: driverBookingReducer, // Register driverBooking reducer if needed
  },
});
