import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const TourList = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seoTitle, setSeoTitle] = useState("Tour Categories");
    const [seoDescription, setSeoDescription] = useState("Browse and book from our exciting tour packages.");
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadTours = async () => {
            try {
                const res = await fetch("https://cabzii.in/api/tour/getAllPackages");
                if (!res.ok) throw new Error("Fetch failed");
                const data = await res.json();
                setTours(data || []);

                if (data.length > 0) {
                    setSeoTitle(`${data[0].name} | Tours`);
                    setSeoDescription(`Explore tours like ${data[0].name} and more.`);
                }
            } catch (err) {
                setError("Failed to load tour packages");
            } finally {
                setLoading(false);
            }
        };
        loadTours();
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const firstCard = scrollRef.current.querySelector(".card-item");
            if (!firstCard) return;
            const cardWidth = firstCard.offsetWidth + 16; // width + gap
            scrollRef.current.scrollBy({
                left: direction === "left" ? -cardWidth : cardWidth,
                behavior: "smooth",
            });
        }
    };

    if (loading) return <div className="p-4 text-center">Loading tours...</div>;
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
                    <h2 className="text-2xl font-bold text-gray-900">
                       Tour Categories
                    </h2>
                    <button
                        onClick={() => navigate("/all-tour-packages")}
                        className="text-blue-600 hover:underline font-medium text-sm"
                    >
                        View All →
                    </button>
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

                {/* Tour Category Cards */}
                <div
                    ref={scrollRef}
                    className="overflow-x-auto scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    <div className="flex gap-4 pb-4">
                        {tours.map((tour) => (
                            <div
                                key={tour._id}
                                className="card-item flex-shrink-0 w-[calc(100%/2-1rem)] sm:w-[calc(100%/3-1rem)] md:w-[calc(100%/4-1rem)] lg:w-[calc(100%/5-1rem)] bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                            >
                                {/* Image */}
                                <div className="relative h-40 w-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                    <img
                                        src={tour.image || "https://via.placeholder.com/400x250?text=Tour"}
                                        alt={tour.name}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                    {tour.maxDiscount > 0 && (
                                         <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                                            Up to {tour.maxDiscount}% OFF
                                        </span>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="p-3 space-y-1.5 text-sm">
                                    <h2 className="text-sm font-semibold text-gray-900 truncate">
                                        {tour.category}
                                    </h2>
                                    {/* <p className="text-xs text-gray-600 truncate">{tour.name}</p> */}

                                    <button
                                        onClick={() => navigate(`/all-tour-packages`)}
                                        className="w-full mt-3 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-blue-700 shadow-sm transition-all duration-200"
                                    >
                                      View More
                                    </button>
                              </div>
                            </div>
                        ))}
                        {tours.length === 0 && (
                            <div className="py-12 text-center w-full text-gray-500">
                                No tours found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
};

export default TourList;
