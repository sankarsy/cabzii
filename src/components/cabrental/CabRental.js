import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const CabRental = () => {
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedPackageByCab, setSelectedPackageByCab] = useState({});
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const [seoTitle, setSeoTitle] = useState("Cab Booking App");
  const [seoDescription, setSeoDescription] = useState(
    "Explore our cabs and book easily"
  );

  // Fetch cabs
  useEffect(() => {
    const loadCabs = async () => {
      try {
        const res = await fetch("https://cabzii.in/api/cab/getall");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        const cabList = data.cabs || [];
        setCabs(cabList);

        // Initialize default package per cab
        const initial = {};
        cabList.forEach((cab) => {
          initial[cab._id] = cab.package?.oneWay ? "oneWay" : "roundTrip";
        });
        setSelectedPackageByCab(initial);

        // Set SEO from first cab
        if (cabList.length > 0) {
          setSeoTitle(cabList[0].seoTitle || "Cab Booking App");
          setSeoDescription(
            cabList[0].seoDescription || "Explore our cabs and book easily"
          );
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load cabs");
      } finally {
        setLoading(false);
      }
    };
    loadCabs();
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) setOpenDropdown(null);
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
      scrollRef.current.scrollBy({
        left: direction === "left" ? -(cardWidth + marginRight) : cardWidth + marginRight,
        behavior: "smooth",
      });
    }
  };

  const handlePackageChange = (cabId, type) => {
    setSelectedPackageByCab((prev) => ({ ...prev, [cabId]: type }));
    setOpenDropdown(null);
  };

  const handleBookNow = (cab) => {
    const selectedType = selectedPackageByCab[cab._id] || "oneWay";
    navigate(`/cab-booking?cabId=${cab._id}&packageId=${selectedType}`);
  };

  if (loading) return <div className="p-4 text-center">Loading cabs...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  return (
    <HelmetProvider>
      <div className="w-full mt-6 mx-auto py-8 px-4 bg-white rounded-xl shadow-lg relative overflow-hidden">
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
        </Helmet>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Book Your Cab</h2>
        </div>

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

        <div ref={scrollRef} className="overflow-x-auto scroll-smooth">
          <div className="flex gap-4 pb-4">
            {cabs.map((cab) => {
              const selectedType = selectedPackageByCab[cab._id] || "oneWay";
              const pkg = cab.package[selectedType] || cab.package.oneWay;
              const saveAmount = pkg.price && pkg.offerPrice && pkg.offerPrice < pkg.price
                ? pkg.price - pkg.offerPrice
                : 0;
              const offerPercent = pkg.price && pkg.offerPrice && pkg.offerPrice < pkg.price
                ? Math.round(((pkg.price - pkg.offerPrice) / pkg.price) * 100)
                : 0;

              return (
                <div
                  key={cab._id}
                  className="card-item flex-shrink-0 w-[calc(100%/2-1rem)] sm:w-[calc(100%/3-1rem)] md:w-[calc(100%/4-1rem)] lg:w-[calc(100%/5-1rem)] bg-white  shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                  onMouseEnter={() => {
                    setSeoTitle(cab.seoTitle || "Cab Booking App");
                    setSeoDescription(cab.seoDescription || "Explore our cabs and book easily");
                  }}
                >
                  <div className="relative h-40 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={cab.cabImages?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
                      alt={cab.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {offerPercent > 0 && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                        {offerPercent}% OFF
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-gray-900 truncate">{cab.name}</h3>

                    <div className="relative dropdown-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(openDropdown === cab._id ? null : cab._id);
                        }}
                        className="bg-gray-100 border border-gray-300 text-gray-700 text-xs font-medium rounded-full px-3 py-1 shadow-sm hover:bg-gray-200 flex items-center gap-1"
                      >
                        {selectedType === "oneWay" ? "One Way" : "Round Trip"}
                        <ChevronDown
                          size={12}
                          className={`transition-transform ${openDropdown === cab._id ? "rotate-180" : ""}`}
                        />
                      </button>
                      {openDropdown === cab._id && (
                        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                          {Object.keys(cab.package).map((key) => (
                            <div
                              key={key}
                              onClick={() => handlePackageChange(cab._id, key)}
                              className={`px-3 py-2 text-xs cursor-pointer hover:bg-gray-100 ${
                                selectedType === key
                                  ? "bg-gray-200 text-gray-900 font-semibold"
                                  : "text-gray-700"
                              }`}
                            >
                              {key === "oneWay" ? "One Way" : "Round Trip"}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 text-[10px] text-gray-600">
                      <span>Km Limit: {pkg.coverage || "N/A"} km</span>
                      <span>Driver Batta: ₹{pkg.bata || "N/A"}</span>
                      <span>Extra/km: ₹{pkg.extraKms || 0}</span>
                      <p className="text-gray-500 text-xs">({cab.type || "N/A"})</p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      {pkg.offerPrice && pkg.offerPrice < pkg.price ? (
                        <>
                          <span className="text-gray-900 font-bold text-sm">₹{pkg.offerPrice}</span>
                          <span className="line-through text-gray-400 text-[10px]">₹{pkg.price}</span>
                          {saveAmount > 0 && (
                            <span className="bg-green-100 text-green-600 text-[10px] px-1.5 py-0.5 rounded-full">
                              Save ₹{saveAmount}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-800 font-semibold text-sm">₹{pkg.price ?? "—"}</span>
                      )}
                    </div>

                    <button
                      onClick={() => handleBookNow(cab)}
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

export default CabRental;
