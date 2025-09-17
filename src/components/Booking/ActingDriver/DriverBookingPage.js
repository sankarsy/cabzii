import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDriverBookingData } from "../../../redux/driverBookingSlice";
import { MapPin, Clock, User, Phone, Mail } from "lucide-react";

const DriverBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);
  const categoryId = query.get("categoryId");
  const packageId = query.get("packageId");

  const [category, setCategory] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pickupDateTime, setPickupDateTime] = useState("");
  const [doorNo, setDoorNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://cabzii.in/api/driver/get/${categoryId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch category");

        setCategory(data.data);
        const pkg = data.data.packages.find((p) => p._id === packageId);
        setSelectedPackage(pkg || null);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId && packageId) {
      fetchCategory();
    } else {
      setError("Invalid category or package ID.");
      setLoading(false);
    }
  }, [categoryId, packageId]);

  const handleBooking = () => {
    if (
      !pickupDateTime.trim() ||
      !doorNo.trim() ||
      !street.trim() ||
      !landmark.trim() ||
      !pickupCity.trim() ||
      !contactName.trim() ||
      !contactPhone.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const dt = new Date(pickupDateTime);
    const pickupDate = dt.toISOString().split("T")[0];
    const pickupTime = dt.toTimeString().slice(0, 5);

    const bookingData = {
      categoryId,
      categoryName: category?.categoryName || "",
      packageId,
      packageName: selectedPackage?.title || "",
      price: selectedPackage?.price || 0,
      offerPrice: selectedPackage?.offerPrice || 0,
      discount: selectedPackage?.discount || 0,
      pickup: {
        doorNo,
        street,
        landmark,
        city: pickupCity,
        date: pickupDate,
        time: pickupTime,
      },
      contact: {
        contactName,
        contactPhone,
        contactEmail,
      },
    };

    dispatch(setDriverBookingData(bookingData));
    navigate("/driver-payment");
  };

  if (loading)
    return <div className="p-4 text-center text-gray-500">Loading details...</div>;
  if (error)
    return <div className="p-4 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-md w-full mx-auto flex-1 p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">👨‍✈️ Book Your Driver</h1>

        {/* Category Info */}
        {category && selectedPackage && (
          <div className="bg-white rounded-2xl shadow-md p-5 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{category.categoryName}</h2>
            <p className="text-sm text-gray-600 mb-4">{category.seoDescription || "Select your package below."}</p>
            <div className="flex items-center gap-4">
              {selectedPackage.offerPrice && selectedPackage.offerPrice < selectedPackage.price ? (
                <>
                  <span className="text-blue-600 font-bold text-lg">₹{selectedPackage.offerPrice}</span>
                  <span className="line-through text-gray-400 text-sm">₹{selectedPackage.price}</span>
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                    Save ₹{selectedPackage.price - selectedPackage.offerPrice}
                  </span>
                </>
              ) : (
                <span className="text-gray-900 font-semibold text-lg">₹{selectedPackage.price}</span>
              )}
            </div>
          </div>
        )}

        {/* Pickup Details */}
        <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm mb-6">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MapPin size={18} /> Pickup Details
          </h3>
          <input
            type="text"
            value={doorNo}
            onChange={(e) => setDoorNo(e.target.value)}
            placeholder="Door No / Flat No"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Street / Area"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="Nearby Landmark"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            value={pickupCity}
            onChange={(e) => setPickupCity(e.target.value)}
            placeholder="City"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-gray-500" />
            <input
              type="datetime-local"
              value={pickupDateTime}
              onChange={(e) => setPickupDateTime(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>

        {/* Contact Info */}
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

        {/* Confirm Booking */}
        <button
          onClick={handleBooking}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 text-white py-3 rounded-xl font-semibold text-base transition duration-200 shadow-md hover:shadow-lg"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default DriverBookingPage;
