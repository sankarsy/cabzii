// DriverAll.jsx
import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async"; // ✅ SEO

const DriverAll = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedPackageByCategory, setSelectedPackageByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch("https://cabzii.in/api/driver/getAll");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();

        const cats = data?.data || [];
        setCategories(cats);
        setFilteredCategories(cats);

        const init = {};
        cats.forEach((c) => {
          if (c?.packages?.length > 0) init[c._id] = c.packages[0]._id;
        });
        setSelectedPackageByCategory(init);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
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
      document.removeEventListener("touchstart", handleOutside, { passive: true });
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [openDropdown]);

  const onPackageChange = (categoryId, pkgId) => {
    setSelectedPackageByCategory((prev) => ({ ...prev, [categoryId]: pkgId }));
    setOpenDropdown(null);
  };

  const handleBookNow = (category, pkg) => {
    if (!pkg?._id) return;
    navigate(`/booking?categoryId=${category._id}&packageId=${pkg._id}`);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    if (type === "All") {
      setFilteredCategories(categories);
    } else {
      setFilteredCategories(
        categories.filter(
          (c) => c?.categoryName?.toLowerCase() === type.toLowerCase()
        )
      );
    }
  };

  const filterOptions = useMemo(
    () => ["All", ...new Set((categories || []).map((c) => c?.categoryName).filter(Boolean))],
    [categories]
  );

  const totalCount = filteredCategories?.length || 0;
  const siteName = "Call Driver";
  const seoTitle =
    filterType === "All"
      ? `Driver Categories | ${siteName}`
      : `${filterType} Drivers – Packages & Prices | ${siteName}`;
  const seoDescription =
    filterType === "All"
      ? `Browse ${totalCount} driver categories with hourly packages, deals, and instant booking. Compare prices and book a driver in minutes.`
      : `Explore ${filterType} driver packages with transparent pricing and quick booking. Compare durations, offers, and choose the best option for you.`;

  const itemListJsonLd = useMemo(() => {
    const items = (filteredCategories || []).map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: c?.categoryName || `Category ${idx + 1}`,
    }));
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Driver Categories",
      itemListElement: items,
    };
  }, [filteredCategories]);

  if (loading) return <div className="p-4 text-center">Loading categories...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  return (
    <div className="w-full mt-4 mx-auto py-8 px-4 bg-white">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <script type="application/ld+json">
          {JSON.stringify(itemListJsonLd)}
        </script>
      </Helmet>

      <div className="flex justify-between items-center px-2 mb-4">
        <h2 className="text-xl font-bold text-gray-800">Driver Categories</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline font-medium text-sm"
        >
          ← Back
        </button>
      </div>

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

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredCategories.map((c) => {
          const selectedPkgId =
            selectedPackageByCategory[c._id] || c?.packages?.[0]?._id;
          const pkg =
            c?.packages?.find((p) => p._id === selectedPkgId) ||
            c?.packages?.[0] ||
            {};
          const img =
            c?.categoryImage?.[0] ||
            "https://via.placeholder.com/400x250?text=Category";

          const saveAmount =
            pkg?.price && pkg?.offerPrice && pkg?.offerPrice < pkg?.price
              ? Number(pkg.price) - Number(pkg.offerPrice)
              : 0;

          return (
            <div
              key={c._id}
              className="bg-white rounded-xl border hover:shadow-lg transition-all duration-200"
            >
              <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
                <img
                  src={img}
                  alt={c?.categoryName || "Driver Category"}
                  loading="lazy"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                {Number(pkg?.discount) > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                    {pkg.discount}% OFF
                  </span>
                )}
              </div>

              <div className="p-3 space-y-1.5">
                <h2 className="text-sm font-semibold text-gray-900 truncate">
                  {c?.categoryName}
                </h2>

                <div
                  className="relative mt-1"
                  ref={(el) => (dropdownRefs.current[c._id] = el)}
                >
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === c._id ? null : c._id)
                    }
                    disabled={!c?.packages?.length}
                    className={`w-full border border-blue-300 font-medium rounded-full px-3 py-1.5 text-xs flex items-center justify-between transition-all ${
                      c?.packages?.length
                        ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {pkg?.duration ? `${pkg.duration} hrs` : "No packages"}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        openDropdown === c._id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === c._id && c?.packages?.length > 0 && (
                    <div className="absolute mt-2 w-full bg-white border border-blue-200 rounded-xl shadow-lg overflow-hidden z-50">
                      {c.packages.map((p) => (
                        <button
                          key={p._id}
                          onClick={() => onPackageChange(c._id, p._id)}
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

                <div className="flex items-center gap-2 mt-1">
                  {pkg?.offerPrice && pkg?.price && Number(pkg.offerPrice) < Number(pkg.price) ? (
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
                      ₹{pkg?.price ?? "—"}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleBookNow(c, pkg)}
                  className="w-full mt-3 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-blue-700 shadow-sm transition-all duration-200 disabled:opacity-60"
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

export default DriverAll;
