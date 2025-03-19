import React from "react";
import car1 from '../assets/car1.png';
import car2 from '../assets/car2.png';
import car3 from '../assets/car3.png';

const carList = [
  {
    name: "MPV - Spacious & Versatile",
    priceAC: "₹2,400 / Day",
    priceNonAC: "₹2,100 / Day",
    image: car1,
    aosDelay: "0",
  },
  {
    name: "Sedan - Smooth & Stylish",
    priceAC: "₹2,100 / Day",
    priceNonAC: "₹1,800 / Day",
    image: car2,
    aosDelay: "500",
  },
  {
    name: "Hatchback - Compact & Efficient",
    priceAC: "₹1,800 / Day",
    priceNonAC: "₹1,500 / Day",
    image: car3,
    aosDelay: "1000",
  },
];

const CarList = () => {
  return (
    <div className="dark:bg-black dark:text-white bg-slate-100 pt-12 pb-24">
      <div className="container">
        
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3"
        >
          Choose Your Ride, Your Way
        </h1>

        <p data-aos="fade-up" data-aos-delay="400" className="text-sm pb-10">
          Find your ideal ride—MPV, Sedan, or Hatchback—available in A/C and Non-A/C packages.
        </p>

        {/* Car Listing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          {carList.map((data, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={data.aosDelay}
              className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group"
            >
              <div className="w-full h-[120px]">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                />
              </div>

              <div className="space-y-2">
                <h1 className="text-primary font-semibold">{data.name}</h1>
                <div className="text-xl font-semibold">
                  <p>A/C: {data.priceAC}</p>
                  <p>Non-A/C: {data.priceNonAC}</p>
                </div>
                <a href="#" className="text-blue-500 hover:underline">
                  Details
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Get Started Button */}
        <div className="grid place-items-center mt-8">
          <button 
            data-aos="fade-up" 
            className="bg-primary text-black px-6 py-3 rounded-md hover:bg-primary/80 transition duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarList;
