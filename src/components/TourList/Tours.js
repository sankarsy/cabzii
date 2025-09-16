import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Tours = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoTitle, setSeoTitle] = useState("Tour Booking App");
  const [seoDescription, setSeoDescription] = useState("Explore exciting tours and book now!");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/tour/getAllPackages");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setPackages(data || []);

        if (data.length > 0 && data[0].subTours?.length > 0) {
          const firstSub = data[0].subTours[0];
          setSeoTitle(`${firstSub.packageName} | Tour Booking`);
          setSeoDescription(`Book your adventure: ${firstSub.packageName} with amazing offers.`);
        }
      } catch (err) {
        setError("Failed to load packages");
      } finally {
        setLoading(false);
      }
    };
    loadPackages();
  }, []);

  const subTourCards = useMemo(() => {
    return (packages || []).flatMap((pkg) =>
      (pkg.subTours || []).map((sub) => ({
        pkgId: pkg._id,
        pkgName: pkg.name,
        parentImage: pkg.image,
        sub,
      }))
    );
  }, [packages]);

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

  const handleBookNow = (pkgId, subId) => {
    navigate(`/tour-booking?tourId=${pkgId}&subTourId=${subId}`);
  };

  if (loading) return <div className="p-4 text-center">Loading packages...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  return (
    <HelmetProvider>
      <div className="w-full mt-6 mx-auto py-8 px-4 bg-white relative overflow-hidden">
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
        </Helmet>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Explore Our Tours</h2>
        </div>

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
        >
          <ChevronRight size={20} />
        </button>

        {/* Sub-tour Cards List */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex gap-4 pb-4">
            {subTourCards.length > 0 ? (
              subTourCards.map(({ pkgId, pkgName, parentImage, sub }) => {
                const img =
                  (sub.image && sub.image[0]) ||
                  parentImage ||
                  "https://via.placeholder.com/400x250?text=Tour+Package";

                const saveAmount =
                  sub.packagePrice &&
                  sub.offerPrice &&
                  sub.offerPrice < sub.packagePrice
                    ? sub.packagePrice - sub.offerPrice
                    : 0;

                return (
                  <div
                    key={`${pkgId}-${sub._id}`}
                    className="card-item flex-shrink-0 w-[calc(100%/2-1rem)] sm:w-[calc(100%/3-1rem)] md:w-[calc(100%/4-1rem)] lg:w-[calc(100%/5-1rem)] bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    {/* Image Section */}
                    <div className="relative h-40 w-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      <img
                        src={img}
                        alt={sub.packageName}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      {sub.packageDiscount > 0 && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                          {sub.packageDiscount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Details Section */}
                    <div className="p-4 space-y-2 text-sm">
                      <h3 className="font-bold text-gray-900 truncate">{sub.packageName}</h3>
                      {pkgName && (
                        <div className="text-[10px] text-gray-500 truncate">Tour Type: {pkgName}</div>
                      )}

                      <div className="flex items-center gap-2 mt-2">
                        {sub.offerPrice && sub.offerPrice < sub.packagePrice ? (
                          <>
                            <span className="text-blue-600 font-bold text-sm">₹{sub.offerPrice}</span>
                            <span className="line-through text-gray-400 text-[10px]">₹{sub.packagePrice}</span>
                            {saveAmount > 0 && (
                              <span className="bg-green-100 text-green-600 text-[10px] px-1.5 py-0.5 rounded-full">
                                Save ₹{saveAmount}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-gray-800 font-semibold text-sm">₹{sub.packagePrice ?? "—"}</span>
                        )}
                      </div>

                      <button
                        onClick={() => handleBookNow(pkgId, sub._id)}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center w-full text-gray-500">No sub-packages found.</div>
            )}
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Tours;
