import React from "react";

const About1 = () => {
  return (
    <div className="dark:bg-black dark:text-white min-h-screen">
      
      
      <section className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-4xl font-bold dark:bg-black dark:text-white">About Us</h2>
        <p className="dark:bg-black dark:text-white max-w-3xl mx-auto">
          Cabzii.in is your trusted travel partner, offering reliable and comfortable car rental services across Tamil Nadu. 
          Our mission is to provide safe, affordable, and luxurious travel experiences with professional drivers.
        </p>
      </section>
      
      <section className="container mx-auto px-6 py-12 dark:bg-black dark:text-white">
        <h3 className="text-2xl font-semibold dark:bg-black dark:text-white mb-4 text-center">Why Choose Us?</h3>
        <ul className="list-disc pl-5 space-y-2 max-w-3xl mx-auto">
          <li>Wide range of budget and luxury cars</li>
          <li>Professional and verified drivers</li>
          <li>Easy online booking process</li>
          <li>Affordable pricing with no hidden costs</li>
          <li>24/7 customer support</li>
        </ul>
      </section>
      
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; 2025 Cabzii.in. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About1;