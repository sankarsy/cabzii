import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-10 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-4">Effective Date: July 14, 2025</p>

        <p className="text-gray-700 mb-6">
          At <strong>Cabzii Travel Services</strong> ("Cabzii", "we", "our", or
          "us"), your privacy is important to us. This Privacy Policy outlines how we
          collect, use, store, and protect your personal information in
          accordance with the Information Technology Act, 2000 and applicable Indian laws.
        </p>

        <Section title="1. Information We Collect">
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Full Name</li>
            <li>Mobile Number & Email Address</li>
            <li>Age / Date of Birth</li>
            <li>Gender Identity</li>
            <li>Residential Address (Address 1, Address 2, Landmark, City, State, PIN)</li>
            <li>Travel Preferences and Booking History</li>
            <li>Device and browser information (IP address, cookies)</li>
          </ul>
        </Section>

        <Section title="2. Purpose of Data Collection">
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>To provide cab, driver, and travel booking services</li>
            <li>To verify user identity and communicate confirmations</li>
            <li>To enhance your booking experience and provide suggestions</li>
            <li>To comply with legal and regulatory obligations</li>
            <li>To send service updates, reminders, and promotional offers (only with consent)</li>
          </ul>
        </Section>

        <Section title="3. Data Sharing & Disclosure">
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>We do <strong>not</strong> sell or rent your data to third parties</li>
            <li>We may share data with:</li>
            <ul className="list-disc pl-10">
              <li>Trusted drivers and service providers for your booking</li>
              <li>Government agencies if legally required</li>
              <li>Payment gateways (e.g., Razorpay, PhonePe) for transactions</li>
            </ul>
          </ul>
        </Section>

        <Section title="4. Data Storage & Security">
          <p className="text-gray-700">
            We store your data securely using encrypted databases and authenticated
            access. Our servers comply with industry standards and are hosted in India.
          </p>
          <p className="text-gray-700 mt-2">
            We implement administrative, technical, and physical safeguards to prevent unauthorized access, disclosure, or misuse of your data.
          </p>
        </Section>

        <Section title="5. Cookies & Tracking">
          <p className="text-gray-700">
            We use browser cookies to personalize content, remember login sessions, and analyze traffic. You may disable cookies via browser settings, though some features may not function.
          </p>
        </Section>

        <Section title="6. Your Rights">
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Right to access and correct your personal data</li>
            <li>Right to withdraw consent (where applicable)</li>
            <li>Right to request deletion of your data</li>
            <li>Right to lodge a complaint with Data Protection Authority (once applicable in India)</li>
          </ul>
        </Section>

        <Section title="7. Children’s Privacy">
          <p className="text-gray-700">
            Our services are not intended for children under 13. We do not knowingly collect data from minors. If you believe a child has provided us data, contact us to delete it.
          </p>
        </Section>

        <Section title="8. Changes to this Policy">
          <p className="text-gray-700">
            We reserve the right to update this Privacy Policy. You are advised to review this page periodically. Continued use after changes means acceptance of the updated policy.
          </p>
        </Section>

        <Section title="9. Contact Us">
          <p className="text-gray-700 mb-1">For any privacy-related queries or data removal requests, please contact:</p>
          <div className="text-gray-700 space-y-1">
            <p>Cabzii Travel Services</p>
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

export default PrivacyPolicy;
