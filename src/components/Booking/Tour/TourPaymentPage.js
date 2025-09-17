// src/components/Booking/Tour/TourPaymentPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { clearTourBookingData } from "../../../redux/tourBookingSlice";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TourPaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state.tourBooking.bookingData);

  if (!bookingData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-blue-50 p-4">
        <h2 className="text-xl font-semibold text-gray-700">No booking found</h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  const packageName = bookingData?.packageName || "Tour Package";
  const pickup = bookingData?.pickup || {};
  const contact = bookingData?.contact || {};
  const members = bookingData?.members || [];

  const baseFarePerPerson =
    bookingData?.offerPrice ?? bookingData?.price ?? 3000;
  const baseFare = baseFarePerPerson * members.length;
  const taxes = Math.round(baseFare * 0.05);
  const totalFare = baseFare + taxes;

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        packageName: bookingData?.packageName || "",
        subTourName: bookingData?.subTourName || "",
        price: bookingData?.price || 0,
        offerPrice: bookingData?.offerPrice || null,
        discountPercentage: bookingData?.discountPercentage || null,
        packageType: bookingData?.packageType || "custom",
        pickup: {
          doorNo: pickup.doorNo || "",
          street: pickup.street || "",
          landmark: pickup.landmark || "",
          city: pickup.city || "",
          state: pickup.state || "",
          zip: pickup.zip || "",
          date: pickup.date ? new Date(pickup.date) : new Date(),
          time: pickup.time || "",
        },
        drop: {
          place: "N/A",
          landmark: "",
          district: "",
          state: "",
          date: pickup.date ? new Date(pickup.date) : new Date(),
          time: pickup.time || "",
        },
        contact: {
          contactName: contact.contactName || "",
          contactPhone: contact.contactPhone || "",
          contactEmail: contact.contactEmail || "",
        },
        members: members.map((m) => ({
          name: m.name || "",
          age: m.age || 0,
          gender: m.gender || "",
        })),
        clientNote: bookingData?.clientNote || "",
        totalFare,
        paymentMethod: "pay_on_ride",
      };

      const res = await axios.post("https://cabzii.in/api//tourbookings/book", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success("✅ Booking Confirmed! Please pay directly to the driver.", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });

        setTimeout(() => {
          dispatch(clearTourBookingData());
          navigate("/");
        }, 3200);
      }
    } catch (err) {
      console.error("❌ Booking failed:", err.response?.data || err.message);
      toast.error(
        `❌ Booking failed: ${err.response?.data?.message || "Try again"}`,
        {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        💳 Payment
      </h2>

      <div className="max-w-md mx-auto space-y-6">
        {/* Trip Summary */}
        <div className="bg-white rounded-xl shadow p-4 border border-blue-100 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Trip Summary</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <span className="font-medium">Package:</span> {packageName}
            </p>
            <p>
              <span className="font-medium">Pickup:</span>{" "}
              {`${pickup.doorNo || ""}, ${pickup.street || ""}, ${pickup.landmark || ""}, ${pickup.city || ""}`}
            </p>
            <p>
              <span className="font-medium">Date & Time:</span> {pickup.time}
            </p>
          </div>

          {/* Contact Info */}
          <div className="pt-4 border-t border-blue-100">
            <h4 className="text-sm font-semibold text-gray-700">Contact</h4>
            <p className="text-sm text-gray-600">{contact.contactName}</p>
            <p className="text-sm text-gray-600">{contact.contactPhone}</p>
            {contact.contactEmail && (
              <p className="text-sm text-gray-600">{contact.contactEmail}</p>
            )}
          </div>

          {/* Travellers */}
          <div className="pt-4 border-t border-blue-100">
            <h4 className="text-sm font-semibold text-gray-700">
              Travellers ({members.length})
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {members.map((m, idx) => (
                <li key={idx}>
                  {idx + 1}. {m.name} ({m.age} yrs, {m.gender})
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fare & Payment */}
        <div className="bg-white rounded-xl shadow p-4 border border-blue-100 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Fare Summary</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Base Fare ({members.length} × ₹{baseFarePerPerson})</span>
              <span>₹{baseFare}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (5%)</span>
              <span>₹{taxes}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-blue-600 text-base">
              <span>Total</span>
              <span>₹{totalFare}</span>
            </div>
          </div>

          <h4 className="text-sm font-semibold text-gray-700">Choose Payment Method</h4>
          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-2 p-2 border rounded-lg bg-blue-50 border-blue-200 cursor-pointer">
              <input type="radio" name="payment" defaultChecked />
              <span className="font-medium text-blue-600">Pay on Ride (Default)</span>
            </label>
            <label className="flex items-center gap-2 p-2 border rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
              <input type="radio" name="payment" disabled />
              UPI (Coming Soon)
            </label>
            <label className="flex items-center gap-2 p-2 border rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
              <input type="radio" name="payment" disabled />
              Card Payment (Coming Soon)
            </label>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold text-sm shadow-md transition"
          >
            Confirm Booking & Pay on Ride ₹{totalFare}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourPaymentPage;
