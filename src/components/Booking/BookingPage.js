import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api/baseURL";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  const carId = query.get("carId");
  const carType = query.get("carType");

  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("");
  const [toList, setToList] = useState([""]);
  const [pickupTime, setPickupTime] = useState("");

  // Detailed Pickup Address
  const [doorNumber, setDoorNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [carDetails, setCarDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchCarDetails = async () => {
    try {
      const res = await API.get(`http://localhost:8000/api/getCarById/${carId}`);
      setCarDetails(res.data);
    } catch (err) {
      console.error("Error fetching car details:", err);
      setError("Unable to load car information.");
    }
  };

  useEffect(() => {
    if (carId) fetchCarDetails();
  }, [carId]);

  const handleAddToLocation = () => {
    if (tripType === "roundtrip") {
      setToList([...toList, ""]);
    }
  };

  const handleToChange = (index, value) => {
    const updatedList = [...toList];
    updatedList[index] = value;
    setToList(updatedList);
  };

  const handleBooking = () => {
    const isAddressComplete =
      doorNumber && addressLine1 && addressLine2 && zipCode;

    if (
      !from ||
      toList.some((to) => !to) ||
      !pickupTime ||
      !isAddressComplete
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const pickupAddress = {
      doorNumber,
      addressLine1,
      addressLine2,
      zipCode,
    };

    const bookingData = {
      carId,
      carType,
      tripType,
      from,
      toList,
      pickupTime,
      pickupAddress,
    };

    console.log("Booking Data:", bookingData);

    navigate("/payment", { state: { bookingData } });
  };

  const getDiscount = () => {
    const mrp = parseFloat(carDetails?.price || 0);
    const offer = parseFloat(carDetails?.offerprice || 0);
    if (mrp > 0 && offer > 0) {
      return Math.round(((mrp - offer) / mrp) * 100);
    }
    return 0;
  };

  // Reset toList if tripType changes to oneway
  useEffect(() => {
    if (tripType === "oneway") {
      setToList([""]);
    }
  }, [tripType]);

  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="max-w-md w-full mx-auto flex-1 p-4">
        <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
          🚖 Booking Form
        </h1>

        {/* Car Details */}
        {carDetails && (
          <div className="bg-white rounded-2xl shadow p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {carDetails.carname}
            </h2>
            <img
              src={`https://api.cabzii.in${carDetails.carimage}`}
              alt={carDetails.carname}
              className="w-full h-40 object-contain bg-gray-100 rounded-lg mb-3"
            />
            <div className="flex items-center gap-3 text-sm">
              <span className="line-through text-gray-400">₹{carDetails.price}</span>
              <span className="text-pink-600 font-bold">
                ₹{carDetails.offerprice}
              </span>
              {getDiscount() > 0 && (
                <span className="bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded">
                  {getDiscount()}% OFF
                </span>
              )}
            </div>
          </div>
        )}

        {/* Trip Type Toggle */}
        <div className="bg-white p-4 rounded-2xl shadow mb-4">
          <label className="block mb-2 font-medium text-gray-700 text-sm">
            Trip Type
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setTripType("oneway")}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition border shadow-sm ${
                tripType === "oneway"
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white border-pink-500"
                  : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              One Way
            </button>
            <button
              onClick={() => setTripType("roundtrip")}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition border shadow-sm ${
                tripType === "roundtrip"
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white border-pink-500"
                  : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Round Trip
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {/* From */}
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-pink-400"
            placeholder="Pickup city or town"
          />

          {/* To Destinations */}
          {toList.map((to, idx) => (
            <input
              key={idx}
              type="text"
              value={to}
              onChange={(e) => handleToChange(idx, e.target.value)}
              className="w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-pink-400"
              placeholder={`Destination ${idx + 1}`}
              disabled={tripType === "oneway" && idx > 0}
            />
          ))}
          {tripType === "roundtrip" && (
            <button
              onClick={handleAddToLocation}
              className="text-pink-600 text-sm underline"
            >
              + Add Another Destination
            </button>
          )}

          {/* Pickup Time */}
          <input
            type="datetime-local"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-pink-400"
          />

          {/* Address Fields */}
          <input
            type="text"
            value={doorNumber}
            onChange={(e) => setDoorNumber(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-pink-400"
            placeholder="Door Number"
          />
          <input
            type="text"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-pink-400"
            placeholder="Street/Locality/Road"
          />
          <input
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-pink-400"
            placeholder="Landmark / Area"
          />
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-pink-400"
            placeholder="Zip / Pin Code"
          />
          <button
          onClick={handleBooking}
          className="bg-gradient-to-r from-pink-500 to-pink-600 w-full  text-white py-2 rounded-xl font-semibold text-base hover:opacity-90 transition"
        >
           Confirm Booking
        </button>
        </div>
      </div>

      {/* Sticky Confirm Button */}
      <div className="p-4 bg-white shadow-inner sticky bottom-0">
        
      </div>
    </div>
  );
};

export default BookingPage;