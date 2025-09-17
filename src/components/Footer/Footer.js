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
    { title: "Privacy Policy", link: "/privacy-policy" },
    { title: "Terms and Conditions", link: "/terms-and-conditions" },
  ];

  const services = [
    "Local Rides",
    "Outstation Trips",
    "Airport Transfers",
    "Luxury Cars",
  ];

  return (
    <footer className="bg-white text-gray-800 pt-14 pb-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 font-serif text-blue-700">
            Cabzii Travel Services
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your trusted partner for safe and comfortable journeys. Book your ride with ease
            and experience transparent pricing with our premium fleet.
          </p>
          <div className="mt-5 space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <FaLocationArrow className="text-blue-600" />
              <span>Chennai, Tamil Nadu, India</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMobileAlt className="text-blue-600" />
              <span>+91 8220870386</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600" />
              <span>support@cabzii.in</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className="hover:text-blue-600 transition duration-300 hover:pl-2 inline-block"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Our Services</h2>
          <ul className="space-y-2 text-sm">
            {services.map((service, index) => (
              <li
                key={index}
                className="hover:text-blue-600 cursor-pointer transition duration-300 hover:pl-2"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Connect With Us</h2>
          <div className="flex gap-4 text-2xl">
            <a
              href="#"
              className="hover:scale-110 transition transform text-blue-500 hover:text-blue-400"
              title="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:scale-110 transition transform text-blue-600 hover:text-blue-500"
              title="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="hover:scale-110 transition transform text-blue-700 hover:text-blue-600"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              className="hover:scale-110 transition transform text-sky-500 hover:text-sky-400"
              title="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:scale-110 transition transform text-green-500 hover:text-green-400"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-sm text-gray-500 border-t border-gray-300 pt-4">
        &copy; {new Date().getFullYear()} Cabzii Travel Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
