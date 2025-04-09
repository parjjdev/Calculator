import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogoClick = () => {
    navigate('/'); 
  };

  return (
    <nav className="p-6 flex justify-center bg-gradient-to-r from-[#EDEDED] to-[#D9D9D9] rounded-t-3xl">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pr-[8px] w-full bg-white rounded-2xl shadow">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div
          className="flex items-center justify-center px-4 py-3 h-[50px] cursor-pointer"
          onClick={handleLogoClick}
        >
          <svg
            className="h-5 w-5"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_28_13264)">
              <path
                d="M14 0C6.26775 0 -4.95911e-05 6.2678 -4.95911e-05 14V23.8C-4.95911e-05 24.9139 0.44245 25.9822 1.2301 26.7698C2.01776 27.5575 3.08604 28 4.19995 28H13.3V21.8582C13.3 20.4568 13.2146 19.005 12.4796 17.8122C11.9533 16.9574 11.2494 16.2257 10.4156 15.6669C9.58172 15.1081 8.63743 14.7351 7.64675 14.5733L7.37865 14.5299C7.26813 14.4921 7.17218 14.4207 7.10424 14.3257C7.0363 14.2307 6.99978 14.1168 6.99978 14C6.99978 13.8832 7.0363 13.7693 7.10424 13.6743C7.17218 13.5793 7.26813 13.5079 7.37865 13.4701L7.64675 13.4267C9.09423 13.1902 10.4309 12.5051 11.468 11.468C12.5051 10.4309 13.1902 9.09428 13.4267 7.6468L13.4701 7.3787C13.5078 7.26817 13.5792 7.17222 13.6742 7.10429C13.7693 7.03635 13.8831 6.99982 14 6.99982C14.1168 6.99982 14.2306 7.03635 14.3257 7.10429C14.4207 7.17222 14.4921 7.26817 14.5299 7.3787L14.5733 7.6468C14.735 8.63749 15.108 9.5818 15.6668 10.4157C16.2256 11.2495 16.9573 11.9534 17.8122 12.4796C19.005 13.2146 20.4568 13.3 21.8582 13.3H27.9832C27.6171 5.8933 21.497 0 14 0Z"
                fill="#F06225"
              />
              <path
                d="M28 14.7H21.8582C20.4568 14.7 19.005 14.7854 17.8122 15.5204C16.8798 16.0949 16.0949 16.8798 15.5204 17.8122C14.7854 19.005 14.7 20.4568 14.7 21.8582V28H23.8C24.9139 28 25.9822 27.5575 26.7698 26.7698C27.5575 25.9822 28 24.9139 28 23.8V14.7ZM0 1.4C0 1.7713 0.147499 2.1274 0.410049 2.38995C0.672602 2.6525 1.0287 2.8 1.4 2.8C1.7713 2.8 2.1274 2.6525 2.38995 2.38995C2.6525 2.1274 2.8 1.7713 2.8 1.4C2.8 1.0287 2.6525 0.672601 2.38995 0.410051C2.1274 0.1475 1.7713 0 1.4 0C1.0287 0 0.672602 0.1475 0.410049 0.410051C0.147499 0.672601 0 1.0287 0 1.4Z"
                fill="#F06225"
              />
            </g>
            <defs>
              <clipPath id="clip0_28_13264">
                <rect
                  width="28"
                  height="28"
                  fill="white"
                  transform="matrix(-1 0 0 1 28 0)"
                />
              </clipPath>
            </defs>
          </svg>
          <span className="ml-2 font-semibold text-gray-800">PPP Calculator</span>
        </div>
        <button className="md:hidden p-2" onClick={toggleMobileMenu}>
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>
  
      <div
        className={`flex flex-col md:flex-row items-center justify-center md:space-x-6 ${
          isMobileMenuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        <Link to="/blogCard" className="text-[#555555] text-base font-inter">
          Blog
        </Link>
        <Link to="/about" className="text-[#555555] text-base font-inter">
          About us
        </Link>
        {isMobileMenuOpen && (
          <button className="flex items-center justify-center bg-green-500 text-white bg-gradient-to-r from-[#5AC57B] to-[#15B146] rounded-lg px-5 py-2 shadow font-medium text-sm hover:bg-green-600 transition-all mb-4 mt-2">
            Contact us
            <svg
              className="ml-2 h-4 w-4"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66663 11.8334L11.3333 5.16675"
                stroke="white"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.66663 5.16665H11.3333V11.8333"
                stroke="white"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
  
      {!isMobileMenuOpen && (
        <div className="hidden md:flex items-center justify-center ml-2">
          <Link
            to="/contactForm"
            className="flex items-center justify-center bg-green-500 text-white bg-gradient-to-r from-[#5AC57B] to-[#15B146] rounded-lg px-5 py-2 shadow font-medium text-sm hover:bg-green-600 transition-all"
          >
            Contact us
            <svg
              className="ml-2 h-4 w-4"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66663 11.8334L11.3333 5.16675"
                stroke="white"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.66663 5.16665H11.3333V11.8333"
                stroke="white"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  </nav>
  
  );
};

export default Navbar;