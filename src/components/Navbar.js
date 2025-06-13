import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BiMenu,
  BiX,
  BiCar,
  BiMapAlt,
  BiUserVoice,
  BiBookBookmark,
  BiLogIn,
  BiLogOut,
} from "react-icons/bi";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { id: 1, name: "Cabs", link: "/carlist", icon: <BiCar /> },
    { id: 2, name: "Tour Package", link: "/tour-packages", icon: <BiMapAlt /> },
    { id: 3, name: "Call Driver", link: "/all-drivers", icon: <BiUserVoice /> },
  ];

  return (
    <nav className="bg-white fixed w-full z-50 shadow-sm border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="text-2xl font-semibold text-gray-800 font-serif"
          >
            Cabzii.in
          </Link>
        </div>

        {/* Search bar (Desktop only) */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <input
            type="text"
            placeholder="Search cars, tours, drivers..."
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {navLinks.map((item) => (
            <Link key={item.id} to={item.link} className="flex items-center gap-1">
              {item.icon}
              {item.name}
            </Link>
          ))}

          <Link to="/my-bookings" className="flex items-center gap-1">
            <BiBookBookmark />
            My Bookings
          </Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="flex items-center gap-1">
              <BiLogOut />
              Logout
            </button>
          ) : (
            <Link to="/login" className="flex items-center gap-1">
              <BiLogIn />
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <BiMenu onClick={() => setIsMenuOpen(true)} className="text-3xl text-gray-800" />
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-md transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 p-5`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <BiX onClick={() => setIsMenuOpen(false)} className="text-3xl cursor-pointer" />
        </div>
        <ul className="space-y-4 text-gray-700">
          {navLinks.map((item) => (
            <li key={item.id}>
              <Link
                to={item.link}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2"
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
              className="flex items-center gap-2"
            >
              <BiBookBookmark />
              My Bookings
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2"
              >
                <BiLogOut />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2"
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
