import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TravelPackage() {
  const scrollRef = useRef(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const firstCard = container?.querySelector('.card-item');
    if (!firstCard) return;

    const cardStyle = window.getComputedStyle(firstCard);
    const cardWidth = firstCard.offsetWidth;
    const marginRight = parseInt(cardStyle.marginRight, 10) || 0;
    const scrollAmount = cardWidth + marginRight;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch('http://localhost:8000/getAllTravelPackages');
        if (!res.ok) throw new Error('Failed to fetch packages');
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading packages...</div>;
  if (error) return <div className="p-4 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="w-full mx-auto py-8 mt-4 px-4 bg-gray-100 relative overflow-hidden">
      <div className="flex justify-between items-center px-2 mb-4">
        <h2 className="text-xl font-bold text-gray-800">Travel Packages</h2>
        <Link to="/travel-packages" className="text-blue-600 hover:underline font-medium text-sm">
          View All →
        </Link>
      </div>

      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-200"
        aria-label="Scroll Left"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-200"
        aria-label="Scroll Right"
      >
        <ChevronRight size={20} />
      </button>

      <div
        ref={scrollRef}
        className="overflow-x-auto scroll-smooth"
        style={{
          scrollbarWidth: 'none',        // Firefox
          msOverflowStyle: 'none',       // IE and Edge
        }}
      >
        <div
          className="flex gap-7"
          style={{
            overflow: 'hidden',
          }}
        >
          {packages.map((item) => (
            <Link
              to={`/travel-packages?category=${encodeURIComponent(item.category)}`}
              key={item._id}
              className="card-item flex-shrink-0 w-[48%] sm:w-[48%] md:w-[30%] lg:w-[18%] bg-white shadow hover:shadow-md transition duration-300 rounded-lg overflow-hidden"
              title={item.seoTitle || item.name}
            >
              <div className="w-full h-36 overflow-hidden rounded-t-lg bg-gray-200 flex items-center justify-center">
                {item.image ? (
                  <img
                    src={`http://localhost:8000/uploads/${item.image}`}
                    alt={item.name || item.seoTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">No Image</span>
                )}
              </div>
              <div className="text-center bg-blue-100 p-3 rounded-b-lg">
                <p className="text-sm font-semibold text-gray-800 capitalize">
                  {item.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Hide scrollbar for WebKit browsers */}
      <style>
        {`
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
