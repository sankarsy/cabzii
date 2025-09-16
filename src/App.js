import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./redux/authSlice";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About1 from "./components/About/About1";
import CarList1 from "./components/CarList/AllCarsList";
import ContactUs from "./components/ContactUs/ContactUs";
import TravelPackageAll from "./components/TravelPackage/TravelPackageAll";

import Driver from "./components/Driver/Driver";
import DriverAll from "./components/Driver/DriverAll";

import Login from "./components/login/Login";
import BookingPage from "./components/Booking/BookingPage";
import PaymentPage from "./components/Booking/PaymentPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Profile from "./components/Profile/Profile";
import PrivacyPolicy from "./components/TermsAndprivacy/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndprivacy/TermsAndConditions";

import AllVehicles from "./components/Vehicles/AllVehicles";
import AllTourPackages from "./components/TourList/AllTourPackages";

import VehicleBookingPage from "./components/Booking/Vehicle/VehicleBookingPage";
import VehiclePaymentPage from "./components/Booking/Vehicle/VehiclePaymentPage";

import TourBookingPage from "./components/Booking/Tour/TourBookingPage";
import TourPaymentPage from "./components/Booking/Tour/TourPaymentPage";

import CabBookingPage from "./components/Booking/CabRental/CabBookingPage";
import CabPaymentPage from "./components/Booking/CabRental/CabPaymentPage";

import DriverBookingPage from "./components/Booking/ActingDriver/DriverBookingPage";
import DriverPaymentPage from "./components/Booking/ActingDriver/DriverPaymentPage";

function App() {
  const dispatch = useDispatch();

  // ✅ Restore login state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(login(token));
    }
  }, [dispatch]);

  return (
    <div className="overflow-x-hidden bg-gray-200">
      <Navbar />
      <div className="pt-12 md:pt-14">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about1" element={<About1 />} />
          <Route path="/carlist" element={<CarList1 />} />
          <Route path="/tour-packages" element={<TravelPackageAll />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/drivers" element={<Driver />} />
          <Route path="/all-drivers" element={<DriverAll />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/all-vehicles" element={<AllVehicles />} />
          <Route path="/all-tour-packages" element={<AllTourPackages />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>

            <Route path="/vehicle-booking" element={<VehicleBookingPage />} />
            <Route path="/vehicle-payment" element={<VehiclePaymentPage />} />

            {/* ✅ fix: use query params, so no ":tourId" */}
            <Route path="/tour-booking" element={<TourBookingPage />} />
            <Route path="/tour-payment" element={<TourPaymentPage />} />
            
            <Route path="/cab-booking" element={<CabBookingPage />} />
            <Route path="/cab-payment" element={<CabPaymentPage />} />

            <Route path="/driver-booking" element={<DriverBookingPage />} />
            <Route path="/driver-payment" element={<DriverPaymentPage />} />

            <Route path="/booking" element={<BookingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
