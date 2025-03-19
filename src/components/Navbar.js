import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon, BiMenu, BiX } from "react-icons/bi";

function Navbar({ isLoggedIn, setIsLoggedIn, theme, setTheme }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { id: 1, name: "Home", link: "/#" },
    { id: 2, name: "Cars", link: "/carlist1" },
    { id: 3, name: "About", link: "/about1" },
    { id: 4, name: "Booking", link: "/bookingpage" },
  ];

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="shadow-md bg-white dark:bg-dark text-dark dark:text-white duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Brand Logo */}
          <h1 className="text-3xl font-bold font-serif">Cabzii.in</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                className="text-lg font-medium hover:text-primary transition-colors duration-300"
                to={item.link}
              >
                {item.name}
              </Link>
            ))}

            {/* Theme Toggle */}
            <div className="ml-4">
              {theme === "dark" ? (
                <BiSolidSun onClick={() => setTheme("light")} className="text-2xl cursor-pointer" />
              ) : (
                <BiSolidMoon onClick={() => setTheme("dark")} className="text-2xl cursor-pointer" />
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <div className="ml-2">
              {theme === "dark" ? (
                <BiSolidSun onClick={() => setTheme("light")} className="text-2xl cursor-pointer" />
              ) : (
                <BiSolidMoon onClick={() => setTheme("dark")} className="text-2xl cursor-pointer" />
              )}
            </div>
            <BiMenu onClick={() => setIsMenuOpen(true)} className="text-3xl cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white dark:bg-dark shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 p-5`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          <BiX onClick={() => setIsMenuOpen(false)} className="text-3xl cursor-pointer" />
        </div>
        <ul className="flex flex-col items-start space-y-4">
          {navLinks.map((item) => (
            <li key={item.id}>
              <Link
                to={item.link}
                className="text-lg font-medium hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
          {/* Logout Option */}
          {isLoggedIn && (
            <li>
              <button className="text-lg font-medium text-red-500" onClick={handleLogout}>
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
