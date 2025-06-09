import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';


export default function TravelPackageAll() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("https://api.cabzii.in/api/getAllTravelPackages");
        // console.log("Full API Response:", res.data); // <-- ADD THIS LINE
        setPackages(res.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Failed to load packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages = category
    ? packages.filter(pkg => pkg.category?.toLowerCase() === category.toLowerCase())
    : packages;

  const seoTitle = category
    ? `${category.toUpperCase()} Travel Packages - Cabzii`
    : 'All Travel Packages - Cabzii';

  return (
    <div className="w-full px-4 py-8 bg-gray-100 min-h-screen">
      <Helmet>
        <title>{seoTitle}</title>
      </Helmet>

      {/* <button onClick={() => navigate(-1)} className="mb-6 text-blue-700 hover:underline font-medium">
        ← Back
      </button> */}

      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        {category ? `${category} Tour Packages` : 'All Travel Packages'}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredPackages.length === 0 ? (
        <p className="text-center text-lg text-gray-700">No packages found.</p>
      ) : (
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredPackages.map((pkg, idx) => {
            const discountedPrice = (pkg.price - (pkg.price * pkg.discount) / 100).toFixed(0);

            return (
              <div
                key={idx}
                className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition duration-300"
              >
                <div className="w-full h-40 bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                  {pkg.name.split(' ')[0]}
                </div>

                <div className="text-center bg-indigo-50 p-3">
                  <p className="text-sm font-semibold text-gray-800 capitalize truncate">{pkg.name}</p>
                  <p className="text-xs text-gray-500 italic">{pkg.description}</p>
                  <p className="text-xs text-gray-400 line-through mt-1">₹{pkg.price}</p>
                  <p className="text-base text-green-600 font-semibold">₹{discountedPrice}</p>
                  {pkg.discount > 0 && (
                    <p className="text-xs text-green-500">
                      You Save ₹{pkg.price - discountedPrice} ({pkg.discount}%)
                    </p>
                  )}
                  <p className="text-xs text-gray-600 mt-1">Driver Bata: ₹{pkg.driverBata}</p>
                  <p className="text-xs text-gray-600">Duration: {pkg.days} Day{pkg.days > 1 ? 's' : ''}</p>
                  <button
                    onClick={() => navigate(`/booking?package=${encodeURIComponent(pkg.name)}`)}
                    className="mt-2 bg-yellow-500 text-white px-3 py-1 text-xs rounded hover:bg-yellow-600 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
