import { useRef, useEffect, useState } from "react";
import API from "../../api/baseURL";
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
      const res = await API.get("/getAllTravelPackages");
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
    <div className="w-full mx-auto py-8 px-4 mt-4 bg-white relative overflow-hidden">
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

      {/* Cards */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex gap-4">
          {packages.map((item) => (
            <Link
              to={`/tour-packages?category=${encodeURIComponent(item.category)}`}
              key={item._id}
              title={item.seoTitle || item.name}
              className="card-item flex-shrink-0 w-[calc(100%/2-1rem)] md:w-[calc(100%/5-1rem)] bg-white shadow rounded overflow-hidden flex flex-col h-[300px]"
            >
              <figure className="h-40 bg-gray-100 overflow-hidden flex items-center justify-center">
                {item.image ? (
                  <img
                    src={`https://api.cabzii.in/uploads/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                    No Image
                  </div>
                )}
              </figure>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-base font-bold text-gray-800 mb-1 line-clamp-1">
                    {item.name}
                  </h2>
                  {item.seoTitle && (
                    <p className="bg-indigo-100 text-indigo-600 text-xs px-2 py-0.5 rounded w-fit mb-1 line-clamp-1">
                      {item.seoTitle}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Explore the best {item.category?.toLowerCase() || "travel"} packages now.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <button className="bg-yellow-500 text-white px-3 py-1 text-xs rounded hover:bg-yellow-600 transition">
                    View
                  </button>
                  <span className="text-xs border border-gray-300 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelPackage;
