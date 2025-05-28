import React from 'react';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-gray-600">
            We’d love to hear from you! Whether you're planning your next vacation or have a question, we're here to help.
          </p>

          <div className="space-y-4 text-gray-700">
            <div>
              <p className="font-semibold">Address:</p>
              <p>Easwaran Kovil Street, Alandur, Chennai - 600016</p>
            </div>
            <div>
              <p className="font-semibold">Phone:</p>
              <p>+91 82208 70386</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>support@cabzii.in</p>
            </div>
            <div>
              <p className="font-semibold">Hours:</p>
              <p>Mon–Fri: 9am – 6pm</p>
              <p>Sat: 10am – 4pm</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 rounded-lg shadow p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Map for Chennai 600016 */}
      <div className="mt-12">
        <iframe
          title="Google Map - Chennai 600016"
          className="w-full h-64 rounded-lg shadow"
          frameBorder="0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.347541460487!2d80.20786551423515!3d12.994112290837288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525dc170487c67%3A0x2f195e6cc72f23b9!2sAlandur%2C%20Chennai%2C%20Tamil%20Nadu%20600016!5e0!3m2!1sen!2sin!4v1716909027036!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
