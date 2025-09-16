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
  {
    name: "Kiran Joshi",
    image: "https://picsum.photos/206",
    description:
      "Cabzii exceeded my expectations. Affordable, reliable, and punctual service. I will definitely use them again for my future travels.",
    rating: 4,
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
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    appendDots: (dots) => (
      <div style={{ bottom: "-30px" }}>
        <ul className="flex justify-center gap-3">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-500 transition-all"></div>
    ),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
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
    <div className="bg-white py-14 mt-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">
            Real Experiences from Our Clients
          </h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Hear what our satisfied customers have to say about their journeys with Cabzii.
          </p>
        </div>

        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {testimonialData.map((client, index) => (
              <div key={index} className="px-3">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-5 h-[280px] flex flex-col justify-between text-center border border-gray-200 hover:border-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={client.image}
                      alt={client.name}
                      className="rounded-full w-16 h-16 object-cover border-4 border-gray-300"
                    />
                    <h3 className="text-base font-bold text-gray-800">{client.name}</h3>
                    <div className="flex justify-center gap-1">{renderStars(client.rating)}</div>
                  </div>

                  <p
                    className={`text-xs text-gray-700 mt-3 italic ${
                      expanded[index] ? "" : "line-clamp-4"
                    }`}
                  >
                    {client.description}
                  </p>

                  {client.description.split(" ").length > 20 && (
                    <button
                      className="text-gray-600 text-xs font-semibold underline mt-1 hover:text-gray-800 transition"
                      onClick={() => toggleExpand(index)}
                    >
                      {expanded[index] ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </Slider>

          {/* White Glowing Navigation Arrows */}
          <button
            className="absolute top-1/2 -translate-y-1/2 left-0 p-3 rounded-full cursor-pointer
                       bg-transparent border border-white/20 hover:border-white/40
                       shadow-[0_0_10px_4px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_6px_rgba(255,255,255,0.4)]
                       transition-all"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <FaChevronLeft className="text-block text-xl" />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-0 p-3 rounded-full cursor-pointer
                       bg-transparent border border-white/20 hover:border-white/40
                       shadow-[0_0_10px_4px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_6px_rgba(255,255,255,0.4)]
                       transition-all"
            onClick={() => sliderRef.current.slickNext()}
          >
            <FaChevronRight className="text-block text-xl" />
          </button>
        </div>
      </div>

      {/* Line Clamp CSS */}
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
