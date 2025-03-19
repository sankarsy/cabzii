import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonialData = [
  {
    name: "Ananya Sharma",
    image: "https://picsum.photos/201",
    description: "Cabzii made our family vacation stress-free and enjoyable.",
    rating: 5,
  },
  {
    name: "Vikram Patel",
    image: "https://picsum.photos/202",
    description: "Professional service with clean cars. Highly recommend for business travel.",
    rating: 4,
  },
  {
    name: "Priya Nair",
    image: "https://picsum.photos/203",
    description: "Excellent travel experience with Cabzii. Affordable pricing and friendly staff.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    image: "https://picsum.photos/204",
    description: "Booked a last-minute ride and was impressed with their punctuality and smooth driving.",
    rating: 4,
  },
  {
    name: "Sneha Kapoor",
    image: "https://picsum.photos/205",
    description: "Reliable and safe travel. Would definitely book again.",
    rating: 5,
  },
];

const Testimonial = () => {
  const sliderRef = React.useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="dark:bg-black dark:text-white py-14 sm:pb-24 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="space-y-6 pb-10">
          <p className="text-2xl sm:text-3xl font-bold text-center font-serif">
            Real Experiences from Our Clients
          </p>
          <p className="text-center text-sm sm:text-base sm:px-32 text-gray-400">
            Hear what our satisfied customers have to say about their journeys with Cabzii.
          </p>
        </div>

        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {testimonialData.map((client, index) => (
              <div key={index} className="p-2 sm:p-4">
                <div className="card text-center group space-y-4 p-4 sm:py-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                  
                  {/* Client Image */}
                  <div className="flex justify-center">
                    <img
                      src={client.image}
                      alt={client.name}
                      className="rounded-full w-16 h-16 sm:w-20 sm:h-20 object-cover border-2 border-primary"
                    />
                  </div>

                  {/* Star Ratings */}
                  <div className="text-xl text-yellow-500">
                    {Array(client.rating).fill('⭐').join('')}
                  </div>

                  <p className="text-sm sm:text-base italic text-gray-600 dark:text-gray-300">
                    "{client.description}"
                  </p>
                  <p className="text-sm sm:text-lg font-semibold">{client.name}</p>
                </div>
              </div>
            ))}
          </Slider>

          {/* Navigation Arrows */}
          <button
            className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition"
            onClick={() => sliderRef.current.slickNext()}
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
