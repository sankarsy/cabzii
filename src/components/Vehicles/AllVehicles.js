import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedPackageByVehicle, setSelectedPackageByVehicle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const res = await fetch("https://cabzii.in/api/vehicle/getAllVehicles");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setVehicles(data);
        setFilteredVehicles(data);

        const init = {};
        data.forEach((v) => {
          if (v.packages?.length > 0) init[v._id] = v.packages[0]._id;
        });
        setSelectedPackageByVehicle(init);
      } catch (err) {
        setError("Failed to load vehicle data");
      } finally {
        setLoading(false);
      }
    };
    loadVehicles();
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (!openDropdown) return;
      const node = dropdownRefs.current[openDropdown];
      if (node && !node.contains(e.target)) setOpenDropdown(null);
    };
    const handleScroll = () => setOpenDropdown(null);

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside, { passive: true });
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [openDropdown]);

  const onPackageChange = (vehicleId, pkgId) => {
    setSelectedPackageByVehicle((prev) => ({ ...prev, [vehicleId]: pkgId }));
    setOpenDropdown(null);
  };

  const handleBookNow = (vehicle, pkg) => {
    if (!pkg?._id) return;
    navigate(`/booking?vehicleId=${vehicle._id}&packageId=${pkg._id}`);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    if (type === "All") {
      setFilteredVehicles(vehicles);
    } else {
      setFilteredVehicles(
        vehicles.filter((v) => v.type?.toLowerCase() === type.toLowerCase())
      );
    }
  };

  if (loading) return <div className="p-4 text-center">Loading vehicles...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  const filterOptions = ["All", "SUV", "Sedan", "Hatchback", "Luxury"];

  return (
    <div className="w-full mt-4 mx-auto py-8 px-4 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center px-2 mb-4">
        <h2 className="text-xl font-bold text-gray-800">All Vehicles</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline font-medium text-sm"
        >
          ← Back
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="sm:hidden relative w-1/2">
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "filter" ? null : "filter")
            }
            className="w-full flex items-center justify-between px-4 py-2 rounded-full text-sm font-medium border border-blue-500 bg-blue-50 text-blue-600 focus:outline-none"
          >
            {filterType}
            <ChevronDown
              size={16}
              className={`ml-2 transition-transform ${
                openDropdown === "filter" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openDropdown === "filter" && (
            <div className="absolute mt-2 w-full bg-white border border-blue-200 rounded-xl shadow-lg overflow-hidden z-50">
              {filterOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    handleFilterChange(type);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-medium transition ${
                    filterType === type
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:flex gap-2 overflow-x-auto pb-2">
          {filterOptions.map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                filterType === type
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredVehicles.map((v) => {
          const selectedPkgId =
            selectedPackageByVehicle[v._id] || v.packages?.[0]?._id;
          const pkg =
            v.packages?.find((p) => p._id === selectedPkgId) ||
            v.packages?.[0] ||
            {};
          const img =
            v.images?.[0] || "https://via.placeholder.com/400x250?text=Vehicle";
          const saveAmount =
            pkg.price && pkg.offerPrice && pkg.offerPrice < pkg.price
              ? pkg.price - pkg.offerPrice
              : 0;

          return (
            <div
              key={v._id}
              className="bg-white rounded-xl border hover:shadow-lg transition-all duration-200"
            >
              {/* Image */}
              <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
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

                {/* Package selector */}
                <div className="sm:hidden relative mt-1">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === v._id ? null : v._id)
                    }
                    disabled={!v.packages?.length}
                    className={`w-full border border-blue-300 font-medium rounded-full px-3 py-1.5 text-xs flex items-center justify-between transition-all ${
                      v.packages?.length
                        ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {pkg?.duration ? `${pkg.duration} hrs` : "No packages"}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        openDropdown === v._id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === v._id && v.packages?.length > 0 && (
                    <div className="absolute mt-2 w-full bg-white border border-blue-200 rounded-xl shadow-lg overflow-hidden z-50">
                      {v.packages.map((p) => (
                        <button
                          key={p._id}
                          onClick={() => onPackageChange(v._id, p._id)}
                          className={`w-full text-left px-4 py-2 text-xs font-medium transition ${
                            selectedPkgId === p._id
                              ? "bg-blue-500 text-white"
                              : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                          }`}
                        >
                          {p.duration} hrs
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="hidden sm:flex items-center gap-2 mt-1">
                  <div
                    className="relative"
                    ref={(el) => (dropdownRefs.current[v._id] = el)}
                  >
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === v._id ? null : v._id)
                      }
                      disabled={!v.packages?.length}
                      className={`border border-blue-300 font-medium rounded-full px-4 py-1.5 text-xs flex items-center gap-1 transition-all ${
                        v.packages?.length
                          ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {pkg?.duration ? `${pkg.duration} hrs` : "No packages"}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          openDropdown === v._id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === v._id && v.packages?.length > 0 && (
                      <div className="absolute left-0 mt-1 min-w-[6rem] bg-white border border-blue-300 rounded-xl shadow-lg z-50">
                        {v.packages.map((p) => (
                          <div
                            key={p._id}
                            onClick={() => onPackageChange(v._id, p._id)}
                            className={`px-3 py-2 text-xs cursor-pointer rounded-lg transition-colors ${
                              selectedPkgId === p._id
                                ? "bg-blue-100 text-blue-600 font-semibold"
                                : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                          >
                            {p.duration} hrs
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {pkg.distance && (
                    <span className="bg-gray-100 rounded-full px-2 py-0.5 text-[11px]">
                      {pkg.distance} km
                    </span>
                  )}
                </div>

                {/* Price Row */}
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

                {/* Book Now */}
                <button
                  onClick={() => handleBookNow(v, pkg)}
                  className="w-full mt-3 bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:scale-105 shadow-sm transition-all duration-200"
                  disabled={!pkg?._id}
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllVehicles;
