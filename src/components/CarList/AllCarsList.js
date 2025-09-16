import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/baseURL"; // Assuming API is axios instance

const AllCarsList = () => {
  const [carList, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await API.get("/getAllCar");
        setCars(res.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };
    fetchCars();
  }, []);

  // ✅ Updated to pass full data via state
  const handleBook = (car) => {
    navigate(`/booking/${car._id}`, {
      state: {
        data: car,
        type: "cab",
      },
    });
  };

  return (
    <div className="w-full px-4 py-8 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">All Available Cabs</h2>
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {carList.map((car) => {
          const mrp = parseFloat(car.price) || 0;
          const offer = parseFloat(car.offerprice) || 0;
          const discount =
            mrp > 0 && offer > 0 ? Math.round(((mrp - offer) / mrp) * 100) : 0;

          return (
            <div
              key={car._id}
              className="card-item flex-shrink-0 bg-white shadow rounded"
            >
              <figure className="h-40 bg-gray-100 overflow-hidden">
                <img
                  src={`https://api.cabzii.in${car.carimage}`}
                  alt={car.carname}
                  className="w-full h-full object-contain"
                />
              </figure>
              <div className="p-4">
                <h2 className="text-base font-bold text-gray-800 flex justify-between items-center">
                  {car.carname}
                  {discount > 0 && (
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">
                      {discount}% OFF
                    </span>
                  )}
                </h2>
                <p className="text-sm text-gray-600">{car.distance} Km</p>
                <div className="flex items-center gap-2 text-sm mt-1">
                  {mrp > 0 && (
                    <span className="line-through text-gray-400">₹{mrp}</span>
                  )}
                  <span className="text-green-600 font-semibold">₹{offer}</span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => handleBook(car)}
                    className="bg-yellow-500 text-white px-3 py-1 text-xs rounded hover:bg-yellow-600 transition"
                  >
                    Book Now
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

export default AllCarsList;
