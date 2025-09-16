import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedPackageByVehicle, setSelectedPackageByVehicle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [seoTitle, setSeoTitle] = useState("All Vehicles");
  const [seoDescription, setSeoDescription] = useState("Explore all vehicle options and book the best ride for your journey.");

  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/vehicle/getAllVehicles");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();

        const vehicleList = Array.isArray(data) ? data : data.data || [];
        setVehicles(vehicleList);

        // Preselect first package for each vehicle
        const init = {};
        vehicleList.forEach((v) => {
          if (v.packages?.length > 0) init[v._id] = v.packages[0]._id;
        });
        setSelectedPackageByVehicle(init);

        // Set SEO based on first vehicle
        if (vehicleList.length > 0) {
          setSeoTitle(`${vehicleList[0].name} | All Vehicles`);
          setSeoDescription(`Explore vehicles like ${vehicleList[0].name} and more for your next adventure.`);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load vehicle information.");
      } finally {
        setLoading(false);
      }
    };
    loadVehicles();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
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

  const onPackageChange = (vehicleId, pkgId) => {
    setSelectedPackageByVehicle((prev) => ({ ...prev, [vehicleId]: pkgId }));
  };

  const handleBookNow = (vehicle, pkg) => {
    navigate(`/vehicle-booking?vehicleId=${vehicle._id}&packageId=${pkg._id}`);
  };

  if (loading) return <div className="p-4 text-center">Loading vehicles...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  return (
    <HelmetProvider>
      <div className="w-full mt-6 mx-auto py-8 px-4 bg-white relative overflow-hidden">
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
        </Helmet>

        {/* Header */}
        <div className="flex justify-between items-center px-2 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Book Your Vehicles
          </h2>
          <button
            onClick={() => navigate("/all-vehicles")}
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

        {/* Vehicle List */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex gap-4">
            {vehicles.map((v) => {
              const selectedPkgId =
                selectedPackageByVehicle[v._id] || v.packages?.[0]?._id;
              const pkg =
                v.packages?.find((p) => p._id === selectedPkgId) ||
                v.packages?.[0] ||
                {};
              const img =
                v.images?.[0] ||
                "https://via.placeholder.com/400x250?text=Vehicle";
              const saveAmount =
                pkg.price && pkg.offerPrice && pkg.offerPrice < pkg.price
                  ? pkg.price - pkg.offerPrice
                  : 0;

              return (
                <div
                  key={v._id}
                  className="card-item flex-shrink-0 w-[calc(100%/2-0.75rem)] md:w-[calc(100%/5-0.75rem)] bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={img}
                      alt={v.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                    {pkg.discount > 0 && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                        {pkg.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-3 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <h2 className="text-sm font-semibold text-gray-900 truncate">
                        {v.name}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-gray-600 mt-1 relative dropdown-container">
                      <div className="relative w-fit">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(openDropdown === v._id ? null : v._id);
                          }}
                          className="bg-blue-50 border border-blue-300 text-blue-600 font-medium rounded-full pl-3 pr-3 py-1 text-xs shadow-sm hover:bg-blue-100 flex items-center gap-2"
                        >
                          {pkg.duration ?? "—"} hrs
                          <ChevronDown
                            size={14}
                            className={`transition-transform ${
                              openDropdown === v._id ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {openDropdown === v._id && (
                          <div className="absolute mt-1 w-full bg-white border border-blue-300 rounded-lg shadow-lg z-50">
                            {v.packages?.map((p) => (
                              <div
                                key={p._id}
                                onClick={() => {
                                  onPackageChange(v._id, p._id);
                                  setOpenDropdown(null);
                                }}
                                className={`px-3 py-2 text-xs cursor-pointer hover:bg-blue-50 ${
                                  p._id === selectedPkgId
                                    ? "bg-blue-100 text-blue-600 font-semibold"
                                    : "text-gray-800"
                                }`}
                              >
                                {p.duration} hrs
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {pkg.distance && (
                        <span className="bg-gray-100 rounded-full px-2 py-0.5 text-[10px]">
                          {pkg.distance} km
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      {pkg.offerPrice && pkg.offerPrice < pkg.price ? (
                        <>
                          <span className="text-blue-600 font-bold text-sm">
                            ₹{pkg.offerPrice}
                          </span>
                          <span className="line-through text-gray-400 text-[10px]">
                            ₹{pkg.price}
                          </span>
                          {saveAmount > 0 && (
                            <span className="bg-green-100 text-green-600 text-[10px] px-1.5 py-0.5 rounded-full">
                              Save ₹{saveAmount}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-800 font-semibold text-sm">
                          ₹{pkg.price ?? "—"}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleBookNow(v, pkg)}
                      className="w-full mt-3 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-blue-700 shadow-sm transition-all duration-200"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Vehicles;
