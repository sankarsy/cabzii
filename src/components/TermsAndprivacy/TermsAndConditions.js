import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-10 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-6">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-4">Effective Date: July 14, 2025</p>

        <p className="text-gray-700 mb-4">
          Welcome to <strong>Cabzii Travel Services</strong> ("we", "us", "our"),
          accessible at <span className="text-blue-600">cabzii.in</span>. These
          Terms and Conditions govern your use of our services, including cab
          bookings, tour packages, and related offerings.
        </p>

        <Section title="1. Services Offered">
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Local and outstation cab bookings</li>
            <li>Tour packages (local, devotional, school, business, etc.)</li>
            <li>Chauffeur (driver-only) services</li>
            <li>Custom travel planning</li>
          </ul>
        </Section>

        <Section title="2. User Responsibilities">
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Provide accurate personal and contact information</li>
            <li>You must be 18 years or older to book any service</li>
            <li>Do not use our platform for illegal or fraudulent purposes</li>
          </ul>
        </Section>

        <Section title="3. Booking & Payment Policy">
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Bookings should be made in advance via our website or app</li>
            <li>Payments accepted via UPI, Net Banking, Credit/Debit Cards, Wallets</li>
            <li>All prices are dynamic and may vary based on demand and travel type</li>
          </ul>
        </Section>

        <Section title="4. Cancellation & Refunds">
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Cancellations must be made at least 24 hours before the trip</li>
            <li>Refunds will be processed within 7–10 business days</li>
            <li>No refunds for last-minute cancellations or no-shows</li>
          </ul>
        </Section>

        <Section title="5. Driver & Vehicle Responsibility">
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Only verified drivers and registered vehicles are assigned</li>
            <li>Images shown on the website are for illustration only</li>
            <li>We will provide alternate vehicles in case of breakdowns</li>
          </ul>
        </Section>

        <Section title="6. Limitation of Liability">
          <p className="text-gray-700">
            We are not liable for delays caused by weather, traffic, natural disasters, or
            unforeseen circumstances. We are not responsible for personal belongings left in the vehicle.
          </p>
        </Section>

        <Section title="7. User Conduct">
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>No abuse or harassment of our staff or drivers will be tolerated</li>
            <li>Do not cause damage to the vehicle or property</li>
            <li>Illegal activities during the trip are strictly prohibited</li>
          </ul>
        </Section>

        <Section title="8. Privacy Policy">
          <p className="text-gray-700">
            We value your privacy. Please review our separate{" "}
            <Link to="/privacy-policy" className="text-blue-600 underline">
              Privacy Policy
            </Link>{" "}
            to learn how we collect, store, and use your personal information.
          </p>
        </Section>

        <Section title="9. Modification of Terms">
          <p className="text-gray-700">
            We reserve the right to modify or update these Terms at any time without prior notice.
            Continued use of our services implies acceptance of the updated Terms.
          </p>
        </Section>

        <Section title="10. Governing Law">
          <p className="text-gray-700">
            These Terms are governed by the laws of India. Any disputes shall be subject
            to the jurisdiction of the courts in Tamil Nadu.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <div className="text-gray-700 space-y-1">
            <p className="font-medium">Cabzii Travel Services</p>
            <p>📍 [Your Office Address Here]</p>
            <p>📞 +91-8220870388</p>
            <p>📧 support@cabzii.in</p>
          </div>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{title}</h2>
    {children}
  </div>
);

export default TermsAndConditions;
