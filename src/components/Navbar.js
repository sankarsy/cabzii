import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BiMenu,
  BiX,
  BiCar,
  BiMapAlt,
  BiUserVoice,
  BiBookBookmark,
  BiCurrentLocation,
  BiLogIn,
  BiLogOut,
} from "react-icons/bi";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState("Detecting...");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village;
          const postcode = data.address.postcode;
          setLocation(`${city} ${postcode}`);
        } catch {
          setLocation("Location error");
        }
      },
      () => setLocation("Permission denied")
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { id: 1, name: "Cabs", link: "/carlist", icon: <BiCar /> },
    { id: 2, name: "Tour Package", link: "/tour-packages", icon: <BiMapAlt /> },
    { id: 3, name: "Call Driver", link: "/call-drivers", icon: <BiUserVoice /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-yellow-50 via-white to-green-50 fixed w-full z-50 shadow-sm border-b">
      <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-2 flex items-center justify-between text-sm md:text-base font-sans">
        
        {/* Left: Logo and Location */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-yellow-500 font-serif">
            Cabzii.in
          </Link>
          <div className="flex items-center text-gray-700 gap-2">
            <BiCurrentLocation className="text-lg text-green-600" />
            <span className="font-medium text-sm md:text-base">
               {location}
            </span>
          </div>
        </div>

        {/* Center: Search (Desktop only) */}
        <div className="flex-1 hidden md:flex mx-6">
          <input
            type="text"
            placeholder="Search cabs, packages, drivers..."
            className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Right: Nav Links + Actions */}
        <div className="hidden md:flex items-center gap-6 text-gray-800">
          {navLinks.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="flex items-center gap-1 hover:text-yellow-500"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

          

          {/* Login / Logout */}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-red-500 flex items-center gap-1">
              <BiLogOut />
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-yellow-600 flex items-center gap-1">
              <BiLogIn />
              Login
            </Link>
          )}

          {/* Booking Icon (last) */}
          <Link to="/my-bookings" title="My Bookings" className="text-xl text-green-700">
            <BiBookBookmark />
          </Link>
        </div>

        {/* Mobile: Menu Icon */}
        <div className="md:hidden">
          <BiMenu onClick={() => setIsMenuOpen(true)} className="text-3xl text-green-700" />
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 p-5`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-700">Menu</h2>
          <BiX onClick={() => setIsMenuOpen(false)} className="text-3xl cursor-pointer" />
        </div>
        <ul className="space-y-5">
          {navLinks.map((item) => (
            <li key={item.id}>
              <Link
                to={item.link}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-lg hover:text-yellow-500"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/my-bookings"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-lg text-green-600 hover:text-yellow-600"
            >
              <BiBookBookmark />
              My Bookings
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-lg text-red-500 hover:underline"
              >
                <BiLogOut />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-lg text-yellow-600 hover:underline"
              >
                <BiLogIn />
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
