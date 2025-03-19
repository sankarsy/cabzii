import React from 'react'
import { Link } from 'react-router-dom'
import { FaCarSide, FaUserShield } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

const skillsData = [
    {
        name: "Wide Vehicle Options",
        icon: (
            <FaCarSide className='text-5xl text-primary group-hover:text-black duration-300' />
        ),
        link: "/",
        description: "From economy cars to premium sedans and spacious SUVs, we offer a variety of vehicles to suit your travel needs. Whether it's a solo trip, family vacation, or business ride, we have the perfect car for you.",
        aosDelay: '0',
    },
    {
        name: "Trusted Drivers",
        icon: (
            <FaUserShield className='text-5xl text-primary group-hover:text-black duration-300' />
        ),
        link: "/",
        description: "Our experienced and professional drivers ensure a safe, smooth, and punctual journey. Every driver is verified, well-trained, and committed to providing the best service.",
        aosDelay: '500',
    },
    {
        name: "24/7 Service",
        icon: (
            <MdAccessTime className='text-5xl text-primary group-hover:text-black duration-300' />
        ),
        link: "/",
        description: "We are available around the clock to provide seamless and hassle-free travel, ensuring you reach your destination anytime, anywhere.",
        aosDelay: '1000',
    }
]

function Services() {
    return (
        <>
            <span id="about"></span>
            <div className="dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
                <div className="container">
                    <div className="pb-12">
                        <h1
                            data-aos="fade-up"
                            className="text-3xl font-semibold text-center sm:text-4xl font-serif"
                        >
                            Why Choose Us
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {skillsData.map((skill, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={skill.aosDelay}
                                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-gray-900 hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
                            >
                                <div className="grid place-items-center">{skill.icon}</div>
                                <h1 className="text-2xl font-bold">{skill.name}</h1>
                                <p>{skill.description}</p>
                                <Link
                                    to={skill.link}
                                    className="inline-block text-lg font-semibold py-3 text-primary group-hover:text-black duration-300"
                                >
                                    Learn more
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Services;
