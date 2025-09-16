import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBookingData } from "../../../redux/bookingSlice";
import { User, Phone, Mail, MapPin, Clock } from "lucide-react";

const VehicleBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);
  const vehicleId = query.get("vehicleId");
  const packageId = query.get("packageId");

  const [doorNumber, setDoorNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const [carDetails, setCarDetails] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:8000/api/vehicle/getvehicle/${vehicleId}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load vehicle");

        setCarDetails(data);

        let pkg = data.packages?.find((p) => p._id === packageId);
        if (!pkg && data.packages?.length > 0) {
          pkg = data.packages[0];
        }
        setSelectedPackage(pkg);
      } catch (err) {
        console.error("Error fetching vehicle details:", err);
        setError(err.message || "Unable to load vehicle information.");
      } finally {
        setLoading(false);
      }
    };

    if (vehicleId) {
      fetchVehicleDetails();
    } else {
      setError("Invalid vehicle ID.");
      setLoading(false);
    }
  }, [vehicleId, packageId]);

  const handleBooking = () => {
    const isAddressComplete =
      doorNumber && addressLine1 && addressLine2 && zipCode;
    const isContactComplete = contactName && contactPhone;

    if (!pickupTime || !isAddressComplete || !isContactComplete) {
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
      vehicleId,
      packageId: selectedPackage?._id,
      pickupTime,
      pickupAddress,
      contact: {
        name: contactName,
        phone: contactPhone,
        email: contactEmail,
      },
      carDetails,
      selectedPackage,
    };

    dispatch(setBookingData(bookingData));
    navigate("/vehicle-payment");
  };

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500">Loading vehicle details...</div>
    );
  if (error)
    return (
      <div className="p-4 text-center text-red-600">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          🚗 Vehicle Booking
        </h1>

        {/* Vehicle Info */}
        {carDetails && selectedPackage && (
          <div className="bg-gray-100 rounded-xl p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {carDetails.name}
            </h2>
            {carDetails.images?.length > 0 ? (
              <img
                src={`http://localhost:8000${carDetails.images[0]}`}
                alt={carDetails.name}
                className="w-full h-36 object-contain bg-white rounded-lg mb-3"
              />
            ) : (
              <div className="w-full h-36 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-3">
                No Image Available
              </div>
            )}
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Duration:</span> {selectedPackage.duration} hrs
              </p>
              <p>
                <span className="font-medium">Distance:</span> {selectedPackage.distance} km
              </p>
              <div className="flex items-center gap-2 mt-1">
                {selectedPackage.offerPrice &&
                selectedPackage.offerPrice < selectedPackage.price ? (
                  <>
                    <span className="text-blue-700 font-bold text-lg">
                      ₹{selectedPackage.offerPrice}
                    </span>
                    <span className="line-through text-gray-400 text-sm">
                      ₹{selectedPackage.price}
                    </span>
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">
                      Save ₹{selectedPackage.price - selectedPackage.offerPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-gray-800 font-semibold text-lg">
                    ₹{selectedPackage.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Pickup Details */}
        <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm mb-6">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MapPin size={18} /> Pickup Details
          </h3>
          <input
            type="datetime-local"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            value={doorNumber}
            onChange={(e) => setDoorNumber(e.target.value)}
            placeholder="Door Number"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="Street / Locality"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            placeholder="Landmark / Area"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Zip / Pin Code"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm mb-6">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <User size={18} /> Contact Information
          </h3>
          <div className="flex items-center gap-2">
            <User size={18} className="text-gray-400" />
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Full Name"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-gray-400" />
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Phone Number"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="Email (optional)"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleBooking}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-base transition duration-200 shadow-md hover:shadow-lg"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default VehicleBookingPage;
