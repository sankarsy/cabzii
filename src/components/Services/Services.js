import React from 'react';
import { Link } from 'react-router-dom';
import { FaCarSide, FaUserShield, FaHeadset } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

const skillsData = [
  {
    name: "Wide Vehicle Options",
    icon: <FaCarSide className="text-3xl sm:text-4xl text-yellow-500" />,
    link: "/",
    description: "Economy to premium cars – perfect for solo trips, vacations, or business rides.",
  },
  {
    name: "Trusted Drivers",
    icon: <FaUserShield className="text-3xl sm:text-4xl text-yellow-500" />,
    link: "/",
    description: "Verified, professional, and courteous drivers for a safe and reliable journey.",
  },
  {
    name: "24/7 Service",
    icon: <MdAccessTime className="text-3xl sm:text-4xl text-yellow-500" />,
    link: "/",
    description: "Available anytime, anywhere – for hassle-free travel, day or night.",
  },
  {
    name: "Instant Support",
    icon: <FaHeadset className="text-3xl sm:text-4xl text-yellow-500" />,
    link: "/",
    description: "Fast customer support to assist with bookings, cancellations, or queries.",
  }
];

function Services() {
  return (
    <div className="py-8 px-4 bg-white mt-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition duration-300 p-5 text-center card-item"
            >
              <div className="mb-3 flex justify-center">{skill.icon}</div>
              <h3 className="text-base font-semibold text-gray-800 mb-2">{skill.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{skill.description}</p>
              <Link
                to={skill.link}
                className="inline-block bg-yellow-500 text-white px-4 py-1 text-xs rounded hover:bg-yellow-600 transition"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
