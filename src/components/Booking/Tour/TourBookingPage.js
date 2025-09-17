// src/components/Booking/Tour/TourBookingPage.jsx

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTourBookingData } from "../../../redux/tourBookingSlice";
import { User, Phone, Mail, MapPin, Clock } from "lucide-react";

const TourBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);
  const tourId = query.get("tourId");
  const subTourId = query.get("subTourId");

  const [tourDetails, setTourDetails] = useState(null);
  const [subTour, setSubTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [members, setMembers] = useState([{ name: "", age: "", gender: "" }]);

  const [doorNo, setDoorNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState("");

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const res = await fetch(
          `https://cabzii.in/api//tour/getPackage/${tourId}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load tour");

        setTourDetails(data);

        if (data.subTours && subTourId) {
          const found = data.subTours.find((s) => s._id === subTourId);
          setSubTour(found || null);
        }
      } catch (err) {
        setError(err.message || "Unable to load tour package.");
      } finally {
        setLoading(false);
      }
    };

    if (tourId) {
      fetchTourDetails();
    } else {
      setError("Invalid tour ID.");
      setLoading(false);
    }
  }, [tourId, subTourId]);

  const handleAddMember = () => {
    setMembers((prev) => [...prev, { name: "", age: "", gender: "" }]);
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const handleBooking = () => {
    if (
      !pickupCity ||
      !pickupDateTime ||
      !contactName ||
      !contactPhone ||
      members.some((m) => !m.name || !m.age || !m.gender)
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const dt = new Date(pickupDateTime);
    const pickupDate = dt.toISOString().split("T")[0];
    const pickupTime = dt.toTimeString().slice(0, 5);

    const bookingData = {
      packageName: subTour?.packageName || tourDetails?.name,
      subTourName: subTour?.packageName || "",
      price: subTour?.packagePrice || tourDetails?.price,
      offerPrice: subTour?.offerPrice || null,
      discountPercentage: subTour?.discountPercentage || null,
      packageType: subTour?.packageType || "custom",
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
      members,
      clientNote: "",
      paymentMethod: "pay_on_ride",
    };

    dispatch(setTourBookingData(bookingData));
    navigate("/tour-payment");
  };

  if (loading)
    return <div className="p-4 text-gray-600 text-center">Loading tour details...</div>;
  if (error)
    return <div className="p-4 text-red-600 text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <div className="max-w-md w-full mx-auto flex-1 p-4">
        <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
          🏞️ Tour Booking Form
        </h1>

        {/* Tour Info */}
        {(tourDetails || subTour) && (
          <div className="bg-white rounded-xl shadow p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {subTour?.packageName || tourDetails?.name}
            </h2>
            <img
              src={
                (subTour?.image && subTour.image[0]) ||
                tourDetails?.image ||
                "https://via.placeholder.com/400x250?text=Tour"
              }
              alt={subTour?.packageName || tourDetails?.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <div className="flex items-center gap-3 mt-2">
              {subTour?.offerPrice &&
              subTour?.offerPrice < subTour?.packagePrice ? (
                <>
                  <span className="text-blue-600 font-bold text-lg">
                    ₹{subTour.offerPrice}
                  </span>
                  <span className="line-through text-gray-400 text-sm">
                    ₹{subTour.packagePrice}
                  </span>
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">
                    Save ₹{subTour.packagePrice - subTour.offerPrice}
                  </span>
                </>
              ) : (
                <span className="text-gray-800 font-semibold text-lg">
                  ₹{subTour?.packagePrice || tourDetails?.price}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Pickup Details */}
        <div className="space-y-4 bg-white p-4 rounded-xl shadow mb-4">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MapPin size={16} /> Pickup Location
          </h3>
          <input
            type="text"
            value={doorNo}
            onChange={(e) => setDoorNo(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
            placeholder="Door No / Flat No"
          />
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
            placeholder="Street / Area"
          />
          <input
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
            placeholder="Nearby Landmark"
          />
          <input
            type="text"
            value={pickupCity}
            onChange={(e) => setPickupCity(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
            placeholder="Pickup City"
          />
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-500" />
            <input
              type="datetime-local"
              value={pickupDateTime}
              onChange={(e) => setPickupDateTime(e.target.value)}
              className="flex-1 border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 bg-white p-4 rounded-xl shadow mb-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Contact Information
          </h3>
          <div className="flex items-center gap-2">
            <User size={16} className="text-gray-500" />
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="flex-1 border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Full Name"
            />
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-gray-500" />
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="flex-1 border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Phone Number"
            />
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-gray-500" />
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="flex-1 border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Email (optional)"
            />
          </div>
        </div>

        {/* Members Info */}
        <div className="space-y-4 bg-white p-4 rounded-xl shadow mb-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Traveller Details
          </h3>
          {members.map((member, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border rounded-xl p-4 shadow-sm space-y-3"
            >
              <h4 className="font-medium text-gray-600">
                Traveller {idx + 1}
              </h4>
              <input
                type="text"
                value={member.name}
                onChange={(e) =>
                  handleMemberChange(idx, "name", e.target.value)
                }
                className="w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
                placeholder="Full Name"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={member.age}
                  onChange={(e) =>
                    handleMemberChange(idx, "age", e.target.value)
                  }
                  className="w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
                  placeholder="Age"
                />
                <select
                  value={member.gender}
                  onChange={(e) =>
                    handleMemberChange(idx, "gender", e.target.value)
                  }
                  className="w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddMember}
            className="text-blue-600 text-sm underline"
          >
            + Add Another Traveller
          </button>
        </div>

        {/* Confirm Booking */}
        <button
          onClick={handleBooking}
          className="bg-gradient-to-r from-blue-600 to-blue-700 w-full text-white py-3 rounded-xl font-semibold text-base hover:opacity-90 transition shadow-md"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default TourBookingPage;
