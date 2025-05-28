import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarList = () => {
  const [carList, setCars] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Fetch all cars
  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:8000/getAllCar");
      setCars(res.data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Scroll left or right by one card width + margin
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

  // Navigate to booking page
  const handleBook = (carId, type) => {
    navigate(`/booking?carId=${carId}&carType=${type}`);
  };

  return (
    <div className="w-full mx-auto py-8 mt-4 px-4 bg-gray-100 relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-2 mb-4">
        <h2 className="text-xl font-bold text-gray-800">Choose Your</h2>
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
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE and Edge
        }}
      >
        <div className="flex gap-7">
          {carList.map((car) => {
            const mrp = parseFloat(car.price) || 0;
            const offer = parseFloat(car.offerprice) || 0;
            const discount =
              mrp > 0 && offer > 0 ? Math.round(((mrp - offer) / mrp) * 100) : 0;

            return (
              <div
                key={car._id}
                className="card-item flex-shrink-0 w-[48%] sm:w-[48%] md:w-[30%] lg:w-[18%] bg-white shadow hover:shadow-md transition duration-300 rounded-lg overflow-hidden"
              >
                {/* Car Image */}
                <div className="w-full h-40 overflow-hidden rounded-t-lg bg-gray-100 flex items-center justify-center">
                  <img
                    src={`http://localhost:8000${car.carimage}`}
                    alt={car.carname}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Car Info */}
                <div className="text-center bg-blue-100 p-3 rounded-b-lg">
                  <p className="text-sm font-semibold text-gray-800 capitalize truncate">
                    {car.carname}
                  </p>
                  <p className="text-xs text-gray-500">{car.distance} Km</p>
                  <p className="text-xs text-gray-400 line-through">₹{mrp}</p>
                  <p className="text-base text-green-600 font-semibold">₹{offer}</p>
                  {discount > 0 && (
                    <p className="text-xs text-green-500">
                      You Save ₹{mrp - offer} ({discount}%)
                    </p>
                  )}
                  <button
                    onClick={() => handleBook(car.carid, car.carname)}
                    className="mt-1 bg-yellow-500 text-white px-3 py-1 text-xs rounded hover:bg-yellow-600 transition"
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
  );
};

export default CarList;
