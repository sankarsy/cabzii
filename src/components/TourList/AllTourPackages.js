import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AllTourPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(null);

  const [seoTitle, setSeoTitle] = useState("All Tour Packages");
  const [seoDescription, setSeoDescription] = useState("Browse all available tour packages and choose your next adventure.");

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/tour/getAllPackages");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setPackages(data || []);

        // Set SEO dynamically based on first package if available
        if (data.length > 0) {
          setSeoTitle(`${data[0].name} | All Tour Packages`);
          setSeoDescription(`Explore tours like ${data[0].name} and more across all categories.`);
        }
      } catch (err) {
        setError("Failed to load packages");
      } finally {
        setLoading(false);
      }
    };
    loadPackages();
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  const categories = useMemo(() => {
    const names = packages.map((p) => p.name?.trim()).filter(Boolean);
    return ["All", ...Array.from(new Set(names))];
  }, [packages]);

  const handleFilterChange = (type) => {
    setFilterType(type);
    setOpenDropdown(null);

    // Update SEO when user selects a filter category
    if (type === "All") {
      setSeoTitle("All Tour Packages");
      setSeoDescription("Browse all available tour packages and choose your next adventure.");
    } else {
      const pkg = packages.find((p) => p.name?.trim() === type);
      if (pkg) {
        setSeoTitle(`${pkg.name} Tours`);
        setSeoDescription(pkg.description || `Explore exciting tours under ${pkg.name}.`);
      }
    }
  };

  const handleBookNow = (pkgId, subId) => {
    navigate(`/tour-booking?tourId=${pkgId}&subTourId=${subId}`);
  };

  if (loading) return <div className="p-4 text-center">Loading packages...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  const activePackage =
    filterType === "All"
      ? null
      : packages.find((p) => p.name?.trim() === filterType) || null;

  const renderCard = (pkg, sub) => {
    const img =
      (sub.image && sub.image[0]) ||
      pkg.image ||
      "https://via.placeholder.com/400x250?text=Tour+Package";
    const saveAmount =
      sub.packagePrice &&
      sub.offerPrice &&
      sub.offerPrice < sub.packagePrice
        ? sub.packagePrice - sub.offerPrice
        : 0;

    return (
      <div
        key={sub._id}
        className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
      >
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={img}
            alt={sub.packageName}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
          {sub.packageDiscount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
              {sub.packageDiscount}% OFF
            </span>
          )}
        </div>

        <div className="p-3 space-y-1.5">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold text-gray-900 truncate">
              {sub.packageName}
            </h2>
           
          </div>

          <div className="flex items-center gap-2 mt-1">
            {sub.offerPrice && sub.offerPrice < sub.packagePrice ? (
              <>
                <span className="text-blue-600 font-bold text-sm">
                  ₹{sub.offerPrice}
                </span>
                <span className="line-through text-gray-400 text-[10px]">
                  ₹{sub.packagePrice}
                </span>
                {saveAmount > 0 && (
                  <span className="bg-green-100 text-green-600 text-[10px] px-1.5 py-0.5 rounded-full">
                    Save ₹{saveAmount}
                  </span>
                )}
              </>
            ) : (
              <span className="text-gray-800 font-semibold text-sm">
                ₹{sub.packagePrice ?? "—"}
              </span>
            )}
          </div>

          <button
            onClick={() => handleBookNow(pkg._id, sub._id)}
            className="w-full mt-3 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-blue-700 shadow-sm transition-all duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    );
  };

  return (
    <HelmetProvider>
      <div className="w-full mt-6 mx-auto py-8 px-4 bg-gray-50">
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
        </Helmet>

        {/* Header */}
        <div className="flex justify-between items-center px-2 mb-4">
          <h2 className="text-xl font-bold text-gray-900">All Tour Packages</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline font-medium text-sm"
          >
            ← Back
          </button>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="sm:hidden relative w-1/2" ref={dropdownRef}>
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
                {categories.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFilterChange(type)}
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
            {categories.map((type) => (
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

        {/* Package Grid */}
        {filterType === "All" ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {packages.flatMap((pkg) =>
              pkg.subTours?.map((sub) => renderCard(pkg, sub))
            )}
          </div>
        ) : (
          <div>
            {activePackage ? (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {activePackage.name} — Packages
                  </h3>
                  <p className="text-sm text-gray-600">{activePackage.description}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {activePackage.subTours?.map((sub) =>
                    renderCard(activePackage, sub)
                  )}
                </div>
              </>
            ) : (
              <div className="p-4 text-gray-600">No category found.</div>
            )}
          </div>
        )}
      </div>
    </HelmetProvider>
  );
};

export default AllTourPackages;
