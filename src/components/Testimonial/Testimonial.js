import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight, FaStar, FaRegStar } from "react-icons/fa";

const testimonialData = [
  {
    name: "Ananya Sharma",
    image: "https://picsum.photos/201",
    description:
      "Cabzii made our family vacation stress-free and enjoyable. The drivers were very professional and the cars were clean and comfortable. Highly recommend their services for any trip.",
    rating: 5,
  },
  {
    name: "Vikram Patel",
    image: "https://picsum.photos/202",
    description:
      "Professional service with clean cars. Highly recommend for business travel. The booking process was very easy and the support team was very helpful.",
    rating: 4,
  },
  {
    name: "Priya Nair",
    image: "https://picsum.photos/203",
    description:
      "Excellent travel experience with Cabzii. Affordable pricing and friendly staff. The cars arrived on time and the drivers were courteous and safe.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    image: "https://picsum.photos/204",
    description:
      "Booked a last-minute ride and was impressed with their punctuality and smooth driving. Very satisfied with the overall experience and will use again.",
    rating: 4,
  },
  {
    name: "Sneha Kapoor",
    image: "https://picsum.photos/205",
    description:
      "Reliable and safe travel. Would definitely book again. The app made it super easy to find rides quickly and the prices were fair.",
    rating: 5,
  },
];

const Testimonial = () => {
  const sliderRef = useRef(null);
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-yellow-400 text-sm" />
      ) : (
        <FaRegStar key={i} className="text-yellow-400 text-sm" />
      )
    );
  };

  return (
    <div className="bg-white py-10 mt-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Real Experiences from Our Clients
          </h2>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Hear what our satisfied customers have to say about their journeys with Cabzii.
          </p>
        </div>

        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {testimonialData.map((client, index) => (
              <div key={index} className="px-2">
                <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition p-5 h-[260px] flex flex-col justify-between text-center card-item">
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={client.image}
                      alt={client.name}
                      className="rounded-full w-14 h-14 object-cover border-2 border-yellow-400"
                    />
                    <h3 className="text-sm font-bold text-gray-800">{client.name}</h3>
                    <div className="flex justify-center gap-1">{renderStars(client.rating)}</div>
                  </div>

                  <p
                    className={`text-xs text-gray-600 mt-3 italic ${
                      expanded[index] ? "" : "line-clamp-4"
                    }`}
                  >
                    {client.description}
                  </p>

                  {client.description.split(" ").length > 20 && (
                    <button
                      className="text-yellow-500 text-xs font-semibold underline mt-1"
                      onClick={() => toggleExpand(index)}
                    >
                      {expanded[index] ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </Slider>

          {/* Navigation Arrows */}
          <button
            className="absolute top-1/2 -translate-y-1/2 left-2 xl:left-4 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-gray-100 transition"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <FaChevronLeft size={18} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-2 xl:right-4 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-gray-100 transition"
            onClick={() => sliderRef.current.slickNext()}
          >
            <FaChevronRight size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Testimonial;
