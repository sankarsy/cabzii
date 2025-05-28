import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/getAllCar")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        return response.json();
      })
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleBookNow = (car) => {
    navigate(`/booking/${car.id}`, { state: { car } });
  };

  if (loading) return <p className="text-center text-gray-500">Loading cars...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const displayedCars = showAll ? cars : cars.slice(0, 4);

  return (
    <div className="dark:bg-black dark:text-white min-h-screen p-6 relative">
      <Helmet>
        <title>Best Car Rental Services | Choose Your Ride | Cabzii</title>
        <meta name="description" content="Find your ideal ride—luxury, SUV, or economy—perfectly maintained for any journey. Book now with Cabzii!" />
        <meta name="keywords" content="Car Rental, SUV Rental, Sedan Rental, Hatchback, Best Car Booking" />
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          Choose Your Ride, Your Way
        </h2>

        {/* View All Button - Right Corner */}
        {cars.length > 4 && (
          <a
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 rounded-lg flex items-center gap-2 cursor-pointer hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition duration-300"
          >
            {showAll ? "Show Less" : "View All"} <span className="text-lg">➡</span>
          </a>
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-10">
        Find your ideal ride—luxury, SUV, or economy—perfectly maintained for any journey.
      </p>

      <div className="grid md:grid-cols-4 gap-6 container mx-auto">
        {displayedCars.map((car) => {
          const discount = car.mrp ? Math.round(((car.mrp - car.price) / car.mrp) * 100) : 0;

          return (
            <div
              key={car.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg text-center hover:shadow-xl transition-transform transform hover:scale-105 border border-gray-200"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-40 object-contain mx-auto mb-2"
              />
              <h3 className="text-lg font-bold text-gray-800 dark:text-yellow-400">{car.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{car.distance} Km</p>

              <div className="mt-2">
                <p className="text-gray-500 text-sm line-through">MRP: ₹{car.mrp}</p>
                <p className="text-xl font-semibold text-green-600">₹{car.price}</p>
                <p className="text-sm text-green-500">You Save: ₹{car.mrp - car.price} ({discount}%)</p>
              </div>

              <button
                onClick={() => handleBookNow(car)}
                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Book Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarList;
