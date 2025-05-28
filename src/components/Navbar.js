import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BiMenu,
  BiX,
  BiCar,
  BiMap,
  BiPhoneCall,
  BiBook,
  BiEnvelope,
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
    { id: 1, name: "Cars", link: "/carlist1", icon: <BiCar /> },
    { id: 2, name: "Tour Packages", link: "/tour-packages", icon: <BiMap /> },
    { id: 3, name: "Call Drivers", link: "/call-drivers", icon: <BiPhoneCall /> },
    { id: 4, name: "My Bookings", link: "/my-bookings", icon: <BiBook /> },
    { id: 5, name: "Contact Us", link: "/contactus", icon: <BiEnvelope /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full top-0 z-50 shadow">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="flex justify-between items-center py-4">
          {/* Brand Logo - Home Button */}
          <Link to="/" className="text-3xl font-bold text-yellow-500 font-serif">
            Cabzii.in
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="flex items-center gap-2 text-lg font-medium hover:text-yellow-500 transition-colors duration-300"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-red-500 font-medium hover:underline ml-4"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <BiMenu
              onClick={() => setIsMenuOpen(true)}
              className="text-3xl cursor-pointer text-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white text-black shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 p-5`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-500">Menu</h2>
          <BiX onClick={() => setIsMenuOpen(false)} className="text-3xl cursor-pointer" />
        </div>
        <ul className="flex flex-col items-start space-y-4">
          {navLinks.map((item) => (
            <li key={item.id}>
              <Link
                to={item.link}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-lg font-medium hover:text-yellow-500"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="text-lg font-medium text-red-500 hover:underline"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
