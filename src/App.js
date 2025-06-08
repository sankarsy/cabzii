import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BookingPage from "./components/BookingPage/BookingPage";
import About1 from "./components/About/About1";
import CarList1 from "./components/CarList/AllCarsList";
import AOS from "aos";
import "aos/dist/aos.css";
import Booking from "./components/Booking/Booking";
import ContactUs from "./components/ContactUs/ContactUs";
import TravelPackageAll from "./components/TravelPackage/TravelPackageAll";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state on initial load
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
  }, []);


  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <div className="pt-16"> {/* Add padding-top equal to navbar height */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/bookingpage" element={<BookingPage />} />
          <Route path="/about1" element={<About1 />} />
          <Route path="/carlist" element={<CarList1 />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/tour-packages" element={<TravelPackageAll />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
