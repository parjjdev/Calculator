import React from 'react';
import Footer from './Footer.tsx';

function PrivacyPolicy() {
  return (
    <div className="bg-gradient-to-r from-[#EDEDED] to-[#D9D9D9] rounded-b-3xl"> 
    <div className="flex-1 py-8 px-4 sm:px-4 max-w-screen-lg mx-auto text-left ">
      <h1 className="text-4xl md:text-6xl mb-[60px] md:mb-[112px] font-serif text-center">Privacy Policy</h1>

      <p className="text-xl md:text-2xl font-semibold font-inter mb-4">
        Effective Date: [Insert Date]
      </p>

      <p className="text-base md:text-lg text-[#252525] font-inter">
        At [Your Website Name], we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold font-inter mb-4 mt-8">1. Information We Collect</h2>
      <ul className="list-disc list-outside ml-6">
        <li className="text-base md:text-lg font-inter text-[#252525]">
          <span className="block">Personal Information: When you contact us or subscribe to updates, we may collect your name, email address, or other details.</span>
        </li>
        <li className="text-base md:text-lg font-inter text-[#252525]">
          <span className="block">Usage Data: We collect anonymous data such as IP addresses, browser type, and page visits to improve our services.</span>
        </li>
        <li className="text-base md:text-lg font-inter text-[#252525]">
          <span className="block">Cookies: We use cookies to enhance your experience and analyze site performance.</span>
        </li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold font-inter mb-4 mt-8">2. How We Use Your Information</h2>
      <ul className="list-disc list-outside ml-6 text-base md:text-lg font-inter text-[#252525]">
        <li><span className="block">To provide and improve our services.</span></li>
        <li><span className="block">To respond to inquiries and support requests.</span></li>
        <li><span className="block">To analyze website performance and enhance user experience.</span></li>
        <li><span className="block">To comply with legal obligations.</span></li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold font-inter mb-4 mt-8">3. Data Protection</h2>
      <ul className="list-disc list-outside ml-6 text-base md:text-lg font-inter text-[#252525]">
        <li><span className="block">We implement security measures to protect your personal data. However, no method of transmission over the Internet is 100% secure.</span></li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold font-inter mb-4 mt-8">4. Third-Party Services</h2>
      <ul className="list-disc list-outside ml-6 text-base md:text-lg font-inter text-[#252525]">
        <li><span className="block">We may use third-party analytics tools and advertising services that collect data for performance tracking.</span></li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold font-inter mb-4 mt-8">5. Your Rights</h2>
      <ul className="list-disc list-outside ml-6 text-base md:text-lg font-inter text-[#252525]">
        <li><span className="block">You can request access, modification, or deletion of your personal data by contacting us at [your@email.com].</span></li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold font-inter mb-4 mt-8">6. Updates to This Policy</h2>
      <ul className="list-disc list-outside ml-6 text-base md:text-lg font-inter text-[#252525]">
        <li><span className="block">We may update this Privacy Policy from time to time. Any changes will be posted on this page. For any privacy-related questions, contact us at [your@email.com].</span></li>
      </ul>
    </div>
    <Footer />
    </div>
  );
}

export default PrivacyPolicy;