import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {}; // Expecting data from previous page

  const handlePayment = () => {
    toast.success("✅ Booking Confirmed! Please pay directly to the driver on ride.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
    });

    setTimeout(() => {
      navigate("/"); // Redirect after showing toast
    }, 3200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      {/* Toast Container */}
      <ToastContainer />

      <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
        💳 Payment
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Section - Trip Summary */}
        <div className="bg-white rounded-2xl shadow p-6 border border-pink-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Trip Summary</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-medium">Car:</span> {data?.carname || "Swift Dzire"}</p>
            <p><span className="font-medium">Pickup:</span> Chennai</p>
            <p><span className="font-medium">Drop:</span> Pondicherry</p>
            <p><span className="font-medium">Date:</span> 25 June 2025</p>
            <p><span className="font-medium">Distance:</span> {data?.distance || 150} km</p>
          </div>
        </div>

        {/* Right Section - Fare & Payment */}
        <div className="bg-white rounded-2xl shadow p-6 border border-pink-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Fare Summary</h3>
          <div className="text-sm text-gray-700 space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Base Fare</span>
              <span>₹{data?.offerprice || 3500}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{Math.round((data?.offerprice || 3500) * 0.05)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-pink-600 text-base mt-2">
              <span>Total</span>
              <span>₹{Math.round((data?.offerprice || 3500) * 1.05)}</span>
            </div>
          </div>

          <h4 className="font-semibold mb-2 text-gray-700">Choose Payment Method</h4>
          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-2 p-2 border rounded-lg bg-pink-50 border-pink-200 cursor-pointer">
              <input type="radio" name="payment" defaultChecked />
              <span className="font-medium text-pink-600">Pay on Ride (Default)</span>
            </label>

            <label className="flex items-center gap-2 p-2 border rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
              <input type="radio" name="payment" disabled /> UPI (Unavailable)
            </label>

            <label className="flex items-center gap-2 p-2 border rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
              <input type="radio" name="payment" disabled /> Credit / Debit Card (Unavailable)
            </label>
          </div>

          <button
            onClick={handlePayment}
            className="w-full mt-6 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-2.5 rounded-xl text-sm font-semibold shadow-md transition"
          >
            Confirm Booking & Pay on Ride ₹{Math.round((data?.offerprice || 3500) * 1.05)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
