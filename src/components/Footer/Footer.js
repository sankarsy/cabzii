import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    { title: "Home", link: "/#" },
    { title: "About Us", link: "/#about" },
    { title: "Our Services", link: "/#services" },
    { title: "Contact Us", link: "/#contact" },
    { title: "FAQ", link: "/#faq" },
  ];

  const services = [
    "Local Rides",
    "Outstation Trips",
    "Airport Transfers",
    "Luxury Cars",
  ];

  return (
    <footer className="dark:bg-gray-900 bg-slate-100 dark:text-white py-8">
      <div className="container mx-auto grid md:grid-cols-4 gap-6 px-6">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold font-serif mb-3">Cabzii Travel Services</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Your trusted travel partner for safe and comfortable journeys. Explore
            our fleet and enjoy hassle-free bookings with transparent pricing.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <FaLocationArrow /> <p>Chennai, Tamil Nadu, India</p>
            </div>
            <div className="flex items-center gap-2">
              <FaMobileAlt /> <p>+91 8220870386</p>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope /> <p>support@cabzii.in</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-500 dark:text-gray-300">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.link} className="hover:text-primary duration-300">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-xl font-bold mb-3">Our Services</h2>
          <ul className="space-y-2 text-gray-500 dark:text-gray-300">
            {services.map((service, index) => (
              <li key={index} className="hover:text-primary duration-300 cursor-pointer">
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-bold mb-3">Connect With Us</h2>
          <div className="flex items-center gap-4">
            <a href="#" className="text-2xl hover:text-primary duration-300">
              <FaInstagram />
            </a>
            <a href="#" className="text-2xl hover:text-primary duration-300">
              <FaFacebook />
            </a>
            <a href="#" className="text-2xl hover:text-primary duration-300">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} Cabzii Travel Services. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
