import React from 'react';
import { Link } from 'react-router-dom';
import { FaCarSide, FaUserShield, FaHeadset } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

const skillsData = [
  {
    name: "Wide Vehicle Options",
    icon: <FaCarSide className="text-4xl sm:text-5xl text-blue-600 drop-shadow-md" />,
    link: "/",
    description: "Economy to premium cars – perfect for solo trips, vacations, or business rides.",
  },
  {
    name: "Trusted Drivers",
    icon: <FaUserShield className="text-4xl sm:text-5xl text-blue-600 drop-shadow-md" />,
    link: "/",
    description: "Verified, professional, and courteous drivers for a safe and reliable journey.",
  },
  {
    name: "24/7 Service",
    icon: <MdAccessTime className="text-4xl sm:text-5xl text-blue-600 drop-shadow-md" />,
    link: "/",
    description: "Available anytime, anywhere – for hassle-free travel, day or night.",
  },
  {
    name: "Instant Support",
    icon: <FaHeadset className="text-4xl sm:text-5xl text-blue-600 drop-shadow-md" />,
    link: "/",
    description: "Fast customer support to assist with bookings, cancellations, or queries.",
  }
];

function Services() {
  return (
    <div className="py-14 px-4 bg-white mt-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
          Why Choose Cabzii
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10 text-sm">
          Reliable, safe, and comfortable rides — every time you travel with us.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-lg border border-blue-100 hover:border-blue-300 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all p-6 flex flex-col h-full"
            >
              <div className="mb-4 flex justify-center">{skill.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">{skill.name}</h3>
              
              {/* Description with truncate + hover expand */}
              <p className="text-sm text-gray-600 leading-relaxed text-center line-clamp-3 hover:line-clamp-none transition-all duration-300">
                {skill.description}
              </p>

              {/* Button pushed to bottom */}
              <div className="mt-auto flex justify-center pt-5">
                <Link
                  to={skill.link}
                  className="inline-block bg-blue-600 drop-shadow-md text-white px-5 py-2 text-sm rounded-full shadow hover:scale-105 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
