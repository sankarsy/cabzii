// src/components/Login.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [otpDigits, setOtpDigits] = useState(Array(4).fill(""));
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  // Auto logout on token expiry
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload.exp * 1000 < Date.now()) {
            dispatch(logout());
            localStorage.removeItem("token");
            toast.info("Session expired. Please login again.");
            navigate("/login");
          }
        } catch (err) {
          console.error("Invalid token", err);
          dispatch(logout());
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [dispatch, navigate]);

  useEffect(() => {
    if (showOtpModal && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [showOtpModal]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updatedOtp = [...otpDigits];
    updatedOtp[index] = value;
    setOtpDigits(updatedOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if ((e.key === "Backspace" || e.key === "Delete") && index > 0 && !otpDigits[index]) {
      const updatedOtp = [...otpDigits];
      updatedOtp[index - 1] = "";
      setOtpDigits(updatedOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  const sendOtp = async () => {
    if (!mobile) {
      toast.error("Enter a valid mobile number");
      return;
    }

    try {
      const res = await axios.post("https://cabzii.in/api/client/send-otp", { mobile });
      if (res.data.status === 1) {
        toast.success(res.data.message);
        setShowOtpModal(true);
        setCooldown(30);
      } else {
        toast.error(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    const otp = otpDigits.join("");
    if (otp.length !== 4) {
      toast.error("Please enter the 4-digit OTP");
      return;
    }
    try {
      const res = await axios.post("https://cabzii.in/api/client/verify-otp", { mobile, otp });
      if (res.data.status === 1) {
        if (res.data.token) dispatch(login(res.data.token));
        toast.success("Login successful");
        setShowOtpModal(false);
        navigate("/");
      } else {
        toast.error(res.data.message || "Invalid OTP");
        setOtpDigits(Array(4).fill(""));
        inputRefs.current[0].focus();
      }
    } catch (err) {
      toast.error("OTP verification failed");
      setOtpDigits(Array(4).fill(""));
      inputRefs.current[0].focus();
    }
  };

  const handleResend = () => {
    if (cooldown === 0) sendOtp();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 p-4">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md border border-blue-100 relative">
        <ToastContainer position="top-right" autoClose={3000} />

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-blue-600 bg-clip-text text-transparent">
          Login with Mobile
        </h2>

        <input
          type="text"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="border border-blue-200 w-full p-3 sm:p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={sendOtp}
          className="w-full bg-blue-600 drop-shadow-md text-white py-2 sm:py-2 rounded-lg shadow-md hover:scale-105 transition"
        >
          Send OTP
        </button>

        {showOtpModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
            onClick={() => setShowOtpModal(false)}
          >
            <div
              className="bg-white w-full max-w-xs sm:max-w-sm rounded-lg shadow-lg p-6 relative animate-slideIn"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-center">Enter OTP</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 text-center">
                OTP sent to: <span className="font-semibold">{mobile}</span>
              </p>

              <div className="flex justify-center gap-2 sm:gap-3 mb-4 flex-wrap">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-10 sm:w-12 h-10 sm:h-12 text-center text-lg sm:text-xl font-bold text-gray-800 bg-gray-100 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                ))}
              </div>

              <button
                onClick={verifyOtp}
                className="w-full bg-blue-600 drop-shadow-md text-white py-2 sm:py-3 rounded-lg shadow-md hover:scale-105 transition mb-2"
              >
                Verify & Login
              </button>

              <button
                onClick={handleResend}
                disabled={cooldown > 0}
                className={`w-full text-sm sm:text-base text-blue-600 hover:text-blue-800 ${
                  cooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
              </button>

              <button
                onClick={() => setShowOtpModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
