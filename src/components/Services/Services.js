import React from 'react';
import { Link } from 'react-router-dom';
import { FaCarSide, FaUserShield, FaHeadset } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

const skillsData = [
    {
        name: "Wide Vehicle Options",
        icon: <FaCarSide className="text-4xl text-yellow-500" />,
        link: "/",
        description: "Economy to premium cars – perfect for solo trips, vacations, or business rides.",
    },
    {
        name: "Trusted Drivers",
        icon: <FaUserShield className="text-4xl text-yellow-500" />,
        link: "/",
        description: "Verified, professional, and courteous drivers for a safe and reliable journey.",
    },
    {
        name: "24/7 Service",
        icon: <MdAccessTime className="text-4xl text-yellow-500" />,
        link: "/",
        description: "Available anytime, anywhere – for hassle-free travel, day or night.",
    },
    {
        name: "Instant Support",
        icon: <FaHeadset className="text-4xl text-yellow-500" />,
        link: "/",
        description: "Fast customer support to assist with bookings, cancellations, or queries.",
    }
];

function Services() {
    return (
        <div className="py-6 sm:py-8 bg-sky-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-gray-800">
                    Why Choose Us
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {skillsData.map((skill, index) => (
                        <div
                            key={index}
                            className="bg-white text-gray-800 rounded-xl shadow-md hover:shadow-lg p-5 text-center transition duration-300"
                        >
                            <div className="mb-3 flex justify-center">{skill.icon}</div>
                            <h3 className="text-base font-semibold mb-2">{skill.name}</h3>
                            <p className="text-sm mb-3">{skill.description}</p>
                            <Link
                                to={skill.link}
                                className="text-sm font-medium text-yellow-500 hover:text-teal-800 transition"
                            >
                                Learn more
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Services;
