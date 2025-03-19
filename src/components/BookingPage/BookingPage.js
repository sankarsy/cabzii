import React, { useState } from "react";

const BookingPage = () => {
  const [tripType, setTripType] = useState("oneway");
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    returnDate: "",
    returnTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", formData);
    alert("Booking submitted!");
  };

  return (
    <div className="dark:bg-black dark:text-white flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Book Your Ride</h2>

        {/* Trip Type Selection */}
        <div className="flex justify-center mb-6">
          <button
            className={`w-1/2 py-2 text-sm sm:text-base font-medium transition-all ${
              tripType === "oneway"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } rounded-l-lg`}
            onClick={() => setTripType("oneway")}
          >
            One Way
          </button>
          <button
            className={`w-1/2 py-2 text-sm sm:text-base font-medium transition-all ${
              tripType === "roundtrip"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } rounded-r-lg`}
            onClick={() => setTripType("roundtrip")}
          >
            Round Trip
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* From Location */}
          <div>
            <label className="block font-medium text-gray-700">From</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Enter pickup location"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* To Location */}
          <div>
            <label className="block font-medium text-gray-700">To</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Enter drop location"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Departure Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Return Date & Time (Only for Round Trip) */}
          {tripType === "roundtrip" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Return Time</label>
                <input
                  type="time"
                  name="returnTime"
                  value={formData.returnTime}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md font-medium hover:bg-blue-600 transition-all"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
