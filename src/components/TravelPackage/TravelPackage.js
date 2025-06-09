import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TravelPackage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const fetchPackages = async () => {
    try {
      const res = await axios.get("https://api.cabzii.in/api/getAllTravelPackages");
      console.log("Full API Response:", res.data); // <-- ADD THIS LINE
      setPackages(res.data);
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError("Failed to load packages");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPackages();
  }, []);

  console.log(packages)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.querySelector(".card-item");
      if (!firstCard) return;
      const cardStyle = window.getComputedStyle(firstCard);
      const cardWidth = firstCard.offsetWidth;
      const marginRight = parseInt(cardStyle.marginRight, 10) || 0;
      const scrollAmount = cardWidth + marginRight;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <div className="p-4 text-center">Loading packages...</div>;
  if (error) return <div className="p-4 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="w-full mx-auto py-8 mt-4 px-4 bg-gray-100 relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-2 mb-4">
        <h2 className="text-xl font-bold text-gray-800">Explore Travel Packages</h2>
        <button
          onClick={() => navigate("/TravelPackage")}
          className="text-blue-600 hover:underline font-medium text-sm"
        >
          View All →
        </button>
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-200"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-200"
      >
        <ChevronRight size={20} />
      </button>

      {/* Package List */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex gap-7">
          {packages.map((item) => (
            <Link
              to={`/tour-packages?category=${encodeURIComponent(item.category)}`}
              key={item._id}
              className="card-item flex-shrink-0 w-[48%] sm:w-[48%] md:w-[30%] lg:w-[18%] bg-white shadow hover:shadow-md transition duration-300 rounded-lg overflow-hidden"
              title={item.seoTitle || item.name}
            >
              <div className="w-full h-36 overflow-hidden rounded-t-lg bg-gray-200 flex items-center justify-center">
                {item.image ? (
                  <img
                    // src={`http://localhost:8000/uploads/${item.image}`}
                    // alt={item.name || item.seoTitle}
                    // src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`}
                    src={`https://api.cabzii.in/uploads/${item.image}`}
                    alt={item.name || item.seoTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">No Image</span>
                )}
              </div>
              <div className="text-center bg-blue-100 p-3 rounded-b-lg">
                <p className="text-sm font-semibold text-gray-800 capitalize truncate">
                  {item.name}
                </p>
                {item.seoTitle && (
                  <p className="text-xs text-gray-500 italic">{item.seoTitle}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelPackage;
