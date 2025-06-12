import React from "react";
import { useNavigate } from "react-router-dom";

const DriverAll = () => {
  const navigate = useNavigate();

  const driverPackages = [
    {
      id: "1",
      type: "Hatchback",
      image: "/images/hatchback.png",
      kmPerHour: 15,
      mrp: 1000,
      offer: 800,
    },
    {
      id: "2",
      type: "Sedan",
      image: "/images/sedan.png",
      kmPerHour: 18,
      mrp: 1500,
      offer: 1100,
    },
    {
      id: "3",
      type: "SUV",
      image: "/images/suv.png",
      kmPerHour: 20,
      mrp: 1800,
      offer: 1300,
    },
    {
      id: "4",
      type: "MPV",
      image: "/images/mpv.png",
      kmPerHour: 16,
      mrp: 2000,
      offer: 1600,
    },
    {
      id: "5",
      type: "Van",
      image: "/images/van.png",
      kmPerHour: 14,
      mrp: 2200,
      offer: 1700,
    },
    {
      id: "6",
      type: "Traveller",
      image: "/images/traveller.png",
      kmPerHour: 12,
      mrp: 2500,
      offer: 2000,
    },
    {
      id: "7",
      type: "Mini Bus",
      image: "/images/minibus.png",
      kmPerHour: 10,
      mrp: 2800,
      offer: 2100,
    },
    {
      id: "8",
      type: "AC Couch",
      image: "/images/couch.png",
      kmPerHour: 9,
      mrp: 3000,
      offer: 2400,
    },
  ];

  const handleViewDrivers = (type) => {
    navigate(`/drivers?type=${type}`);
  };

  return (
    <div className="w-full px-4 py-8 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Driver list</h2>
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {driverPackages.map((pkg) => {
          const mrp = pkg.mrp || 0;
          const offer = pkg.offer || 0;
          const discount =
            mrp > 0 && offer > 0 ? Math.round(((mrp - offer) / mrp) * 100) : 0;

          return (
            <div
              key={pkg.id}
              className="card-item flex-shrink-0 bg-white shadow rounded"
            >
              <figure className="h-40 bg-gray-100 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.type}
                  className="w-full h-full object-contain"
                />
              </figure>
              <div className="p-4">
                <h2 className="text-base font-bold text-gray-800 flex justify-between items-center">
                  {pkg.type}
                  {discount > 0 && (
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">
                      {discount}% OFF
                    </span>
                  )}
                </h2>
                <p className="text-sm text-gray-600">{pkg.kmPerHour} KM / Hr</p>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <span className="line-through text-gray-400">₹{mrp}</span>
                  <span className="text-green-600 font-semibold">₹{offer}</span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => handleViewDrivers(pkg.type)}
                    className="bg-yellow-500 text-white px-3 py-1 text-xs rounded hover:bg-yellow-600 transition"
                  >
                    View Drivers
                  </button>
                  <span className="text-xs border border-gray-300 px-2 py-0.5 rounded">
                    Cabzii
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriverAll;
