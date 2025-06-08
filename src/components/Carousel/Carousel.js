import React from "react";
import Slider from "react-slick";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import image1 from './Carouselasset/banner1.png';
import image2 from './Carouselasset/banner2.png';
import image3 from './Carouselasset/banner3.png';

const slides = [
  { id: 1, image: image1 },
  { id: 2, image: image2 },
  { id: 3, image: image3 },
];

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-40 text-white text-3xl rounded-full p-1 hover:bg-opacity-70 transition cursor-pointer"
  >
    <BiChevronRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-40 text-white text-3xl rounded-full p-1 hover:bg-opacity-70 transition cursor-pointer"
  >
    <BiChevronLeft />
  </div>
);

const Carousel = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed:4000,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    // dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {dots}
      </div>
    ),
    customPaging: () => (
      <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
    ),
  };

  return (
    <div className="px-4 pt-2">
      <Slider {...settings}>
        {slides.map(slide => (
          <div key={slide.id} className="w-full h-full">
            <img
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
