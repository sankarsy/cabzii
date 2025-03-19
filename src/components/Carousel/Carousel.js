import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselData = [
  {
    image: "https://via.placeholder.com/300", 
    title: "FICCI Healthcare Startup Of The Year 2022",
  },
  {
    image: "https://via.placeholder.com/300",
    title: "BW Healthcare 40 Under 40 2023",
  },
  {
    image: "https://via.placeholder.com/300",
    title: "e4m Pride Of India 2024",
  },
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Section - Carousel */}
            <div className="w-full lg:w-3/4 mx-auto">
              <Slider {...settings}>
                {carouselData.map((item, index) => (
                  <div key={index} className="p-4">
                    <div className="rounded-full overflow-hidden border-4 border-blue-500 w-64 h-64 mx-auto">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* Right Section - Text Content */}
            <div className="text-left">
              <h2 className="text-3xl font-bold text-teal-600">
                More Than Just One Feather In Our Cap
              </h2>
              <ul className="mt-6 space-y-4 text-gray-700">
                {carouselData.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-lg"
                  >
                    <span className="text-teal-500">✔️</span> {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
