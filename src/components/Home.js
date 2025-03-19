import Hero from "./Hero/Hero";
import About from "./About/About";
import Services from "./Services/Services";
import CarList from "./CarList/CarList";
import Testimonial from "./Testimonial/Testimonial";
import Footer from "./Footer/Footer";
import Carousel from "./Carousel/Carousel"; 
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon

function Home() {
  // WhatsApp number and message
  const whatsappNumber = "919944197416";
  const message = encodeURIComponent("Hi, I want to book a Cabzii ride. Can you assist me?");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <>
      {/* Carousel Section */}
      {/* <Carousel /> */}

      {/* Main Sections */}
      <Hero />
      <About />
      <Services />
      <CarList />
      <Testimonial />
      <Footer />

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <a
          href={whatsappLink}
          className="bg-green-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 md:gap-3 hover:bg-green-600 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-xl md:text-2xl" />
          <span className="text-sm md:text-lg font-semibold">Book Cabzii</span>
        </a>
      </div>
    </>
  );
}

export default Home;
