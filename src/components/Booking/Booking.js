import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const car = location.state?.car || {};

  const [tripType, setTripType] = useState("one-way");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);

  const handleTripTypeChange = (type) => {
    setTripType(type);
  };

  const handleAddressLookup = async (location, setter) => {
    if (!location) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { display_name } = data[0];
        setter(display_name);
      } else {
        setter("Address not found");
      }
    } catch (error) {
      setter("Error fetching address");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 grid md:grid-cols-2 gap-8">
        
        {/* Left Side: Car Details */}
        <div className="flex flex-col">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-80 object-cover rounded-lg"
          />
          <div className="mt-6">
            <h2 className="text-4xl font-bold">{car.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {car.description}
            </p>
            <p className="text-xl font-semibold text-blue-600 mt-4">
              {car.price} / Day
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Distance: {car.distance} Km
            </p>
          </div>
        </div>

        {/* Right Side: Booking Form */}
        <div>
          <h3 className="text-3xl font-bold mb-6">Book Your Trip</h3>

          {/* Trip Type Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              className={`px-6 py-2 rounded-lg ${tripType === "one-way" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
              onClick={() => handleTripTypeChange("one-way")}
            >
              One Way
            </button>
            <button
              className={`px-6 py-2 rounded-lg ${tripType === "round-trip" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
              onClick={() => handleTripTypeChange("round-trip")}
            >
              Round Trip
            </button>
          </div>

          {/* Booking Form */}
          <form className="grid gap-4">
            
            {/* Pickup Location */}
            <div>
              <label className="block font-medium">Pickup Location</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder="Enter pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                onBlur={() => handleAddressLookup(pickup, setPickupLocation)}
              />
              {pickupLocation && (
                <p className="text-sm text-gray-500 mt-1">{pickupLocation}</p>
              )}
            </div>

            {/* Drop Location */}
            <div>
              <label className="block font-medium">Drop Location</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder="Enter drop location"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                onBlur={() => handleAddressLookup(drop, setDropLocation)}
              />
              {dropLocation && (
                <p className="text-sm text-gray-500 mt-1">{dropLocation}</p>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Date</label>
                <input type="date" className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block font-medium">Time</label>
                <input type="time" className="w-full border p-2 rounded" />
              </div>
            </div>

            {/* Return Date and Time (for round trip only) */}
            {tripType === "round-trip" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Return Date</label>
                  <input type="date" className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block font-medium">Return Time</label>
                  <input type="time" className="w-full border p-2 rounded" />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
