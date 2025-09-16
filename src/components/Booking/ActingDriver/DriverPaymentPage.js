import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { clearDriverBookingData } from "../../../redux/driverBookingSlice";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const DriverPaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state.driverBooking.bookingData);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const serviceName = bookingData?.categoryName || "Driver Service";
  const pickup = bookingData?.pickup || {};
  const contact = bookingData?.contact || {};
  const baseFare = bookingData?.offerPrice ?? bookingData?.price ?? 1500;
  const taxes = Math.round(baseFare * 0.05);
  const totalFare = baseFare + taxes;

  const handlePayment = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const payload = {
        categoryId: bookingData.categoryId,
        categoryName: bookingData.categoryName,
        packageId: bookingData.packageId,
        packageName: bookingData.packageName,
        price: bookingData.price,
        offerPrice: bookingData.offerPrice,
        discountPercentage: bookingData.discount,
        pickup: {
          city: pickup.city || "",
          date: pickup.date ? new Date(pickup.date) : new Date(),
          time: pickup.time || "",
        },
        contact: {
          contactName: contact.contactName || "",
          contactPhone: contact.contactPhone || "",
          contactEmail: contact.contactEmail || "",
        },
        totalFare,
        paymentMethod: "pay_on_ride",
      };

      const res = await axios.post(
        "http://localhost:8000/api/driver-bookings/book",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("✅ Booking Confirmed! Please pay directly to the driver.", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });

        setTimeout(() => {
          dispatch(clearDriverBookingData());
          navigate("/");
        }, 3200);
      } else {
        throw new Error(res.data.message || "Booking failed");
      }
    } catch (err) {
      console.error("❌ Booking failed:", err.response?.data || err.message);
      toast.error(
        `❌ Booking failed: ${err.response?.data?.message || err.message || "Try again"}`,
        { position: "top-center", autoClose: 3000, theme: "colored" }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        👨‍✈️ Driver Payment
      </h2>

      <div className="max-w-md mx-auto space-y-6">
        {/* Trip Summary */}
        <div className="bg-white rounded-xl shadow p-4 border border-blue-100 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Trip Summary</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <span className="font-medium">Service:</span> {serviceName}
            </p>
            <p>
              <span className="font-medium">Pickup City:</span> {pickup.city || "City"}
            </p>
            <p>
              <span className="font-medium">Date & Time:</span>{" "}
              {pickup.date ? new Date(pickup.date).toLocaleDateString() : "N/A"} {pickup.time || "N/A"}
            </p>
          </div>

          {/* Contact Info */}
          {contact.contactName && (
            <div className="pt-4 border-t border-blue-100">
              <h4 className="text-sm font-semibold text-gray-700">Contact</h4>
              <p className="text-sm text-gray-600">{contact.contactName}</p>
              <p className="text-sm text-gray-600">{contact.contactPhone}</p>
              {contact.contactEmail && (
                <p className="text-sm text-gray-600">{contact.contactEmail}</p>
              )}
            </div>
          )}
        </div>

        {/* Fare & Payment */}
        <div className="bg-white rounded-xl shadow p-4 border border-blue-100 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Fare Summary</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Base Fare</span>
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
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold text-sm shadow-md transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Processing..." : `Confirm Booking & Pay on Ride ₹${totalFare}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverPaymentPage;
