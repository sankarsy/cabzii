import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllCarsList = () => {
  const [carList, setCars] = useState([]);
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:8000/getAllCar");
      setCars(res.data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleBook = (carId, type) => {
    navigate(`/booking?carId=${carId}&carType=${type}`);
  };

  return (
    <div className="w-full px-4 py-8 bg-gray-100">
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
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition duration-300"
            >
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                <img
                  src={`http://localhost:8000${car.carimage}`}
                  alt={car.carname}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center bg-blue-100 p-3">
                <p className="text-sm font-semibold text-gray-800 capitalize truncate">
                  {car.carname}
                </p>
                <p className="text-xs text-gray-500">{car.distance} Km</p>
                <p className="text-xs text-gray-400 line-through">₹{mrp}</p>
                <p className="text-base text-green-600 font-semibold">₹{offer}</p>
                {discount > 0 && (
                  <p className="text-xs text-green-500">
                    You Save ₹{mrp - offer} ({discount}%)
                  </p>
                )}
                <button
                  onClick={() => handleBook(car.carid, car.carname)}
                  className="mt-1 bg-yellow-500 text-white px-3 py-1 text-xs rounded hover:bg-yellow-600 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCarsList;
