  import { useRef, useEffect, useState } from "react";
  import API from "../../api/baseURL";
  import { useNavigate } from "react-router-dom";
  import { ChevronLeft, ChevronRight } from "lucide-react";

  const CarList = () => {
    const [carList, setCars] = useState([]);
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCars = async () => {
      try {
        const res = await API.get("/getAllCar");
        setCars(res.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load car data");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchCars();
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

    const handleBook = (carId, type) => {
      navigate(`/booking?carId=${carId}&carType=${type}`);
    };

    if (loading) return <div className="p-4 text-center">Loading cars...</div>;
    if (error) return <div className="p-4 text-center text-red-600">Error: {error}</div>;

    return (
      <div className="w-full mt-4 mx-auto py-8 px-4 bg-white relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-2 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Book Your Car</h2>
          <button
            onClick={() => navigate("/carlist")}
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

        {/* Car List */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex gap-4">
            {carList.map((car) => {
              const mrp = parseFloat(car.price) || 0;
              const offer = parseFloat(car.offerprice) || 0;
              const discount =
                mrp > 0 && offer > 0 ? Math.round(((mrp - offer) / mrp) * 100) : 0;

              return (
                <div
                  key={car._id}
                  className="card-item flex-shrink-0 w-[calc(100%/2-1rem)] md:w-[calc(100%/5-1rem)] bg-white shadow rounded"
                >
                  <figure className="h-40 bg-gray-100 overflow-hidden">
                    <img
                      src={`https://api.cabzii.in${car.carimage}`}
                      alt={car.carname}
                      className="w-full h-full object-contain"
                    />
                  </figure>
                  <div className="p-4">
                    <h2 className="text-base font-bold text-gray-800 flex justify-between items-center">
                      {car.carname}
                      {discount > 0 && (
                        <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">
                          {discount}% OFF
                        </span>
                      )}
                    </h2>
                    <p className="text-sm text-gray-600">{car.distance} Km</p>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <span className="line-through text-gray-400">₹{mrp}</span>
                      <span className="text-green-600 font-semibold">₹{offer}</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <button
                        onClick={() => handleBook(car.carid, car.carname)} 
                        className="bg-yellow-500 text-white px-3 py-1 text-xs rounded hover:bg-yellow-600 transition"
                      >
                        Book Now
                      </button>
                      <span className="text-xs border border-gray-300 px-2 py-0.5 rounded">Cabzii</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  export default CarList;
