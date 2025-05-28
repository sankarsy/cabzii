import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const packageData = {
  local: [
    { name: 'Chennai City Tour', description: 'One day sightseeing', price: 3500, discount: 10, driverBata: 500, days: 1 },
    { name: 'Mahabalipuram Day Trip', description: 'Historical tour', price: 4000, discount: 12, driverBata: 500, days: 1 },
    { name: 'Kanchipuram Temple Visit', description: 'Cultural visit', price: 3700, discount: 8, driverBata: 500, days: 1 },
    { name: 'ECR Coastal Drive', description: 'Beachside fun', price: 4200, discount: 15, driverBata: 500, days: 1 },
    { name: 'Vandalur Zoo Visit', description: 'Family trip', price: 3000, discount: 5, driverBata: 500, days: 1 },
    { name: 'Crocodile Park Tour', description: 'Wildlife experience', price: 3100, discount: 10, driverBata: 500, days: 1 },
    { name: 'Shopping in T Nagar', description: 'Leisure shopping', price: 2800, discount: 7, driverBata: 500, days: 1 },
    { name: 'Muttukadu Boating', description: 'Water adventure', price: 3600, discount: 9, driverBata: 500, days: 1 },
    { name: 'DakshinaChitra Visit', description: 'Cultural museum', price: 3300, discount: 11, driverBata: 500, days: 1 },
    { name: 'Marina Beach Ride', description: 'City beach tour', price: 2900, discount: 6, driverBata: 500, days: 1 },
  ],
  outstation: [
    { name: 'Pondicherry Weekend', description: '2 days beach trip', price: 7500, discount: 15, driverBata: 800, days: 2 },
    { name: 'Yelagiri Hills', description: 'Hill station weekend', price: 7200, discount: 10, driverBata: 800, days: 2 },
    { name: 'Kodaikanal Escape', description: 'Cool climate getaway', price: 12000, discount: 20, driverBata: 1000, days: 3 },
    { name: 'Ooty Retreat', description: 'Tea gardens and more', price: 11000, discount: 18, driverBata: 1000, days: 3 },
    { name: 'Madurai Pilgrimage', description: 'Temple town trip', price: 8000, discount: 12, driverBata: 900, days: 2 },
    { name: 'Rameswaram Visit', description: 'Spiritual and scenic', price: 9500, discount: 14, driverBata: 950, days: 2 },
    { name: 'Kumbakonam Temples', description: 'Temple cluster tour', price: 7800, discount: 10, driverBata: 850, days: 2 },
    { name: 'Thanjavur Heritage', description: 'Historic sites tour', price: 8200, discount: 11, driverBata: 850, days: 2 },
    { name: 'Coorg Nature Trip', description: 'Forest and falls', price: 13500, discount: 17, driverBata: 1100, days: 3 },
    { name: 'Munnar Tea Tour', description: 'South Indian hill joy', price: 12500, discount: 16, driverBata: 1000, days: 3 },
  ],
  devotional: [
    { name: 'Tirupati Darshan', description: 'Spiritual journey', price: 6000, discount: 10, driverBata: 700, days: 1 },
    { name: 'Palani Murugan Temple', description: 'Devotional hill temple', price: 7800, discount: 15, driverBata: 850, days: 2 },
    { name: 'Sabarimala Pilgrimage', description: 'Holy trip', price: 9500, discount: 18, driverBata: 950, days: 3 },
    { name: 'Kanchi Kamakshi Temple', description: 'Day temple visit', price: 4200, discount: 8, driverBata: 500, days: 1 },
    { name: 'Velankanni Church Visit', description: 'Catholic pilgrimage', price: 9000, discount: 13, driverBata: 950, days: 2 },
    { name: 'Madurai Meenakshi', description: 'Famous temple visit', price: 8200, discount: 11, driverBata: 850, days: 2 },
    { name: 'Rameswaram Spiritual', description: 'Holy city trip', price: 8900, discount: 12, driverBata: 900, days: 2 },
    { name: 'Thiruvannamalai Deepam', description: 'Festival special', price: 7500, discount: 10, driverBata: 800, days: 2 },
    { name: 'Trichy Temples', description: 'South Tamil Nadu tour', price: 8100, discount: 14, driverBata: 850, days: 2 },
    { name: 'Kumbakonam Pilgrimage', description: 'Multiple temples', price: 7900, discount: 9, driverBata: 850, days: 2 },
  ],
  oneday: [
    { name: 'Vellore Golden Temple', description: 'Day trip', price: 4800, discount: 12, driverBata: 500, days: 1 },
    { name: 'Pulicat Lake', description: 'Bird sanctuary tour', price: 4600, discount: 10, driverBata: 500, days: 1 },
    { name: 'Gingee Fort', description: 'Historic site tour', price: 4900, discount: 11, driverBata: 500, days: 1 },
    { name: 'Vedanthangal Bird Sanctuary', description: 'Nature watch', price: 4400, discount: 9, driverBata: 500, days: 1 },
    { name: 'Sadras Fort Visit', description: 'Dutch monument tour', price: 4300, discount: 10, driverBata: 500, days: 1 },
    { name: 'Muttukadu & Boathouse', description: 'Fun on water', price: 4700, discount: 10, driverBata: 500, days: 1 },
    { name: 'Sriperumbudur Temple', description: 'Day devotional trip', price: 4200, discount: 8, driverBata: 500, days: 1 },
    { name: 'Kovalam Beach', description: 'Seaside fun', price: 4500, discount: 7, driverBata: 500, days: 1 },
    { name: 'Cholamandalam Artists Village', description: 'Art & craft tour', price: 4600, discount: 9, driverBata: 500, days: 1 },
    { name: 'VGP Snow Kingdom', description: 'Family fun', price: 5000, discount: 12, driverBata: 500, days: 1 },
  ],
};


export default function TravelPackageAll() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const currentPackages = category ? packageData[category] || [] : Object.values(packageData).flat();
  const seoTitle = category ? `${category.toUpperCase()} Travel Packages - Cabzii` : 'All Travel Packages - Cabzii';

  return (
    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <Helmet>
        <title>{seoTitle}</title>
      </Helmet>

      <button onClick={() => navigate(-1)} className="mb-6 text-blue-700 hover:underline font-medium">
        ← Back
      </button>

      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        {category ? `${category.toUpperCase()} Tour Packages` : 'All Travel Packages'}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : currentPackages.length === 0 ? (
        <p className="text-center text-lg text-gray-700">No packages found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentPackages.map((pkg, idx) => {
            const discountedPrice = (pkg.price - (pkg.price * pkg.discount) / 100).toFixed(0);

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h2>
                <p className="text-gray-500 mb-3 italic">{pkg.description}</p>

                <div className="mb-2">
                  <p className="text-sm text-red-400 line-through">₹{pkg.price}</p>
                  <p className="text-lg font-semibold text-green-700">₹{discountedPrice}</p>
                  <p className="text-sm text-green-600">You Save ₹{pkg.price - discountedPrice} ({pkg.discount}%)</p>
                </div>

                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li><strong>Driver Bata:</strong> ₹{pkg.driverBata}</li>
                  <li><strong>Duration:</strong> {pkg.days} Day{pkg.days > 1 ? 's' : ''}</li>
                </ul>

                <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-colors">
                  Book Now
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
