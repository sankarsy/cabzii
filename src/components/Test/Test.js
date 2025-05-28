import React from "react";
import { FaPlane, FaHotel, FaCar, FaUser, FaSearch } from "react-icons/fa";

const Test = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">TUXIMO</h1>
        <div className="space-x-4">
          <button className="text-gray-700">Home</button>
          <button className="text-gray-500">Hotels</button>
          <button className="text-gray-500">Cars</button>
          <button className="text-gray-500">Customer Support</button>
          <button className="bg-black text-white px-4 py-2 rounded">Log In</button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="text-center py-16 bg-white">
        <h2 className="text-4xl font-bold">WHERE TO FLY?</h2>
        <p className="text-gray-600 mt-2">Find countless flight options & deals to various destinations around the world</p>
      </div>
      
      {/* Booking Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 -mt-10 relative">
        <div className="flex justify-between mb-6">
          <button className="flex items-center text-blue-500">
            <FaPlane className="mr-2" /> Flights
          </button>
          <button className="text-gray-500">Hotels</button>
          <button className="text-gray-500">Cars</button>
          <button className="text-gray-500">Customer Support</button>
        </div>
        
        {/* Search Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="From (Origin)" className="border p-3 rounded" />
          <input type="text" placeholder="To (Destination)" className="border p-3 rounded" />
          <input type="date" placeholder="Depart" className="border p-3 rounded" />
          <input type="date" placeholder="Return" className="border p-3 rounded" />
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <FaUser className="mr-2" />
            <input type="number" placeholder="Traveler" className="border p-2 rounded w-24" />
          </div>
          <button className="bg-black text-white px-6 py-2 rounded flex items-center">
            <FaSearch className="mr-2" /> Search
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center p-6 bg-gray-900 text-white mt-10">
        &copy; 2025 TUXIMO. All rights reserved.
      </footer>
    </div>
  );
};

export default Test;
