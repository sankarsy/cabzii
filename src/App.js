import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Myorder from "./components/Myorder";
import Admin from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Forgotpassword from "./components/Forgotpassword";
import OTP from "./components/OTP";
import Resetpassword from "./components/Resetpassword";
import BookingPage from "./components/BookingPage/BookingPage";
import About1 from "./components/About/About1";
import CarList1 from "./components/CarList/CarList1";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state on initial load
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
  }, []);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const element = document.documentElement; // Target <html>
    if (theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

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
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        theme={theme}
        setTheme={setTheme}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/bookingpage" element={<BookingPage />} />
        <Route path="/about1" element={<About1 />} />
        <Route path="/carlist1" element={<CarList1 />} />

        {/* Auth and Protected Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/resetpassword" element={<Resetpassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/myorder" element={<Myorder />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
