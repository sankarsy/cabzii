import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import API from "../../api/baseURL";

const TravelPackageAll = () => {
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
        const res = await API.get("/getAllTravelPackages");
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
    ? `${category} Travel Packages - Cabzii`
    : 'All Travel Packages - Cabzii';

  const handleBook = (pkgId, pkgName) => {
    navigate(`/booking?packageId=${pkgId}&packageType=${pkgName}`);
  };

  return (
    <div className="w-full px-4 py-8 bg-white">
      <Helmet>
        <title>{seoTitle}</title>
      </Helmet>

      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {category ? category : "All"} Packages
      </h2>

      {loading ? (
        <p className="text-center">Loading packages...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredPackages.length === 0 ? (
        <p className="text-center text-gray-600">No packages available.</p>
      ) : (
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredPackages.map((pkg) => {
            const mrp = parseFloat(pkg.price) || 0;
            const offer = parseFloat(pkg.offerprice) || 0;
            const discount = mrp && offer ? Math.round(((mrp - offer) / mrp) * 100) : 0;

            return (
              <div
                key={pkg._id}
                className="card-item flex-shrink-0 bg-white shadow rounded"
              >
                <figure className="h-40 bg-gray-100 overflow-hidden">
                  <img
                    src={`https://api.cabzii.in/uploads/${pkg.image}`}
                    alt={pkg.name}
                    className="w-full h-full object-contain"
                  />
                </figure>
                <div className="p-4">
                  <h2 className="text-base font-bold text-gray-800 flex justify-between items-center">
                    {pkg.name}
                    {discount > 0 && (
                      <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">
                        {discount}% OFF
                      </span>
                    )}
                  </h2>
                  <p className="text-sm text-gray-600">{pkg.category}</p>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    {mrp > 0 && <span className="line-through text-gray-400">₹{mrp}</span>}
                    <span className="text-green-600 font-semibold">₹{offer}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() => handleBook(pkg._id, pkg.name)}
                      className="bg-yellow-500 text-white px-3 py-1 text-xs rounded hover:bg-yellow-600 transition"
                    >
                      Book Now
                    </button>
                    <span className="text-xs border border-gray-300 px-2 py-0.5 rounded">
                      Cabzii
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


export default TravelPackageAll;
