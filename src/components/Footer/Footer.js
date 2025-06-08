import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaLocationArrow,
  FaMobileAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about" },
    { title: "Services", link: "/services" },
    { title: "Contact", link: "/contact" },
    { title: "FAQ", link: "/faq" },
  ];

  const services = [
    "Local Rides",
    "Outstation Trips",
    "Airport Transfers",
    "Luxury Cars",
  ];

  return (
    <footer className="bg-slate-800 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3 font-serif">Cabzii Travel Services</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Your trusted partner for safe and comfortable journeys. Book your ride with ease and experience transparent pricing with our premium fleet.
          </p>
          <div className="mt-4 space-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <FaLocationArrow /> <span>Chennai, Tamil Nadu, India</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMobileAlt /> <span>+91 8220870386</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope /> <span>support@cabzii.in</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            {quickLinks.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className="hover:text-yellow-400 transition duration-200"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Our Services</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            {services.map((service, index) => (
              <li key={index} className="hover:text-yellow-400 cursor-pointer transition duration-200">
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Connect With Us</h2>
          <div className="flex gap-4 text-xl">
            <a href="#" className="text-pink-500 hover:scale-110 transition" title="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="text-blue-600 hover:scale-110 transition" title="Facebook">
              <FaFacebook />
            </a>
            <a href="#" className="text-blue-800 hover:scale-110 transition" title="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" className="text-sky-400 hover:scale-110 transition" title="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="text-green-500 hover:scale-110 transition" title="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-400 border-t border-slate-600 pt-4">
        &copy; {new Date().getFullYear()} Cabzii Travel Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
