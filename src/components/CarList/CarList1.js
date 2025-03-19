import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p className="text-center text-gray-500">Loading cars...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="dark:bg-black dark:text-white min-h-screen p-6">
      {/* SEO Optimization */}
      <Helmet>
        <title>Best Car Rental Services | Choose Your Ride | Cabzii</title>
        <meta name="description" content="Find your ideal ride—luxury, SUV, or economy—perfectly maintained for any journey. Book now with Cabzii!" />
        <meta name="keywords" content="Car Rental, SUV Rental, Sedan Rental, Hatchback, Best Car Booking" />
      </Helmet>

      <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Choose Your Ride, Your Way
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
        Find your ideal ride—luxury, SUV, or economy—perfectly maintained for any journey.
      </p>

      <div className="grid md:grid-cols-3 gap-6 container mx-auto">
        {cars.map((car) => (
          <div 
            key={car.id} 
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg text-center hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <p className="text-gray-700 dark:text-gray-300 font-semibold">{car.distance} Km</p>
            <img 
              src={car.image} 
              alt={car.name} 
              className="w-full h-40 object-contain mx-auto"
            />
            <h3 className="text-lg font-bold text-yellow-500 mt-4">{car.name}</h3>
            <p className="text-gray-800 dark:text-gray-300 text-lg font-semibold">{car.price}/Day</p>
            <button 
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
