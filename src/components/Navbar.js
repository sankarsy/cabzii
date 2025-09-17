import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  BiMenu,
  BiX,
  BiCar,
  BiMapAlt,
  BiUserVoice,
  BiLogIn,
  BiLogOut,
  BiUser,
  BiBookBookmark,
} from "react-icons/bi";
import { AiOutlineGift } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const client = useSelector((state) => state.auth.client);
  const displayName = client?.firstname?.trim() ? client.firstname : "User";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navLinks = [
    { id: 1, name: "Cabs", link: "/all-vehicles", icon: <BiCar /> },
    { id: 2, name: "Tour Package", link: "/all-tour-packages", icon: <BiMapAlt /> },
    { id: 3, name: "Call Driver", link: "/all-drivers", icon: <BiUserVoice /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white fixed w-full z-50 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="hover:opacity-90 transition"
        >
          <img
            src="/navlogo1.png"
            alt="Cabzii.in"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Search bar (Desktop only) */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <input
            type="text"
            placeholder="Search cars, tours, drivers..."
            className="w-full max-w-md px-4 py-2 rounded-lg border border-blue-300 text-sm 
              focus:outline-none focus:ring-2 focus:ring-green-400 
              shadow-sm bg-gray-50 placeholder-gray-400 text-gray-800"
          />
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm relative">
          {navLinks.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className={`flex items-center gap-1 px-2 py-1 rounded transition 
                ${isActive(item.link)
                  ? "bg-orange-100 text-orange-600 border-b-2 border-orange-500"
                  : "hover:text-blue-600 hover:bg-yellow-50"
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

          {/* Logged In Dropdown */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 hover:text-green-600 transition"
              >
                <BiUser />
                <span>{displayName}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 border rounded-lg shadow-xl overflow-hidden">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-blue-50 text-sm text-blue-600"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <BiUser className="inline-block mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/my-bookings"
                    className="block px-4 py-2 hover:bg-green-50 text-sm text-green-600"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <BiBookBookmark className="inline-block mr-2" />
                    My Bookings
                  </Link>
                  <Link
                    to="/coupons"
                    className="block px-4 py-2 hover:bg-yellow-50 text-sm text-yellow-600"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <AiOutlineGift className="inline-block mr-2" />
                    Coupons
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-orange-50 text-sm text-orange-600"
                  >
                    <BiLogOut className="inline-block mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`flex items-center gap-1 px-2 py-1 rounded transition 
                ${isActive("/login")
                  ? "bg-green-100 text-green-600"
                  : "hover:text-blue-600 hover:bg-yellow-50"
                }`}
            >
              <BiLogIn />
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <BiMenu
            onClick={() => setIsMenuOpen(true)}
            className="text-3xl text-gray-800 cursor-pointer hover:text-blue-600 transition"
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-md transform 
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"} 
          transition-transform duration-300 ease-in-out z-50 p-5 text-gray-800`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-600">Menu</h2>
          <BiX
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl cursor-pointer hover:text-green-600"
          />
        </div>
        <ul className="space-y-4">
          {navLinks.map((item) => (
            <li key={item.id}>
              <Link
                to={item.link}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded transition 
                  ${isActive(item.link)
                    ? "bg-orange-100 text-orange-600"
                    : "hover:text-blue-600 hover:bg-yellow-50"
                  }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded transition hover:bg-blue-50 text-blue-600"
                >
                  <BiUser />
                  {displayName}
                </Link>
              </li>
              <li>
                <Link
                  to="/my-bookings"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded transition hover:bg-green-50 text-green-600"
                >
                  <BiBookBookmark />
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  to="/coupons"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded transition hover:bg-yellow-50 text-yellow-600"
                >
                  <AiOutlineGift />
                  Coupons
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-orange-50 text-orange-600 transition"
                >
                  <BiLogOut />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded transition hover:bg-blue-50 text-blue-600"
              >
                <BiLogIn />
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
