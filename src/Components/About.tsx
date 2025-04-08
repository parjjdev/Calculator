import React from 'react';
import Footer from './Footer.tsx';


function About() {

    return (

        <div className="font-sans min-h-screen flex flex-col bg-gradient-to-r from-[#EDEDED] to-[#D9D9D9] rounded-b-3xl">

            <div className="flex-1 py-8 px-2 max-w-screen-lg mx-auto">

                <h1 className="text-4xl md:text-6xl mb-[60px] md:mb-[112px] font-serif">About Us</h1>



                <p className="mb-2 text-xl md:text-2xl text-left font-bold">About Us</p>



                <p className="mb-6 text-left leading-[24px] md:leading-[26px]">

                    At [Your Website Name], we are a team of three passionate professionals who came together to build a platform that simplifies financial insights for everyone. Having worked together in a SaaS startup, we realized that understanding the true value of money—whether across different countries, different time periods, or different currencies—is crucial for individuals and businesses alike. However, we also noticed that most online tools for financial comparisons are either overly complicated or lack accurate, up-to-date data. That's when we decided to leverage our combined expertise in UX/UI design, full-stack development, and SEO & digital marketing to create a seamless, reliable, and user-friendly financial calculator platform.

                </p>



                <p className="mb-2 text-left">Our team consists of:</p>



                <ul className="list-disc ml-6 mb-6 text-left leading-[24px] md:leading-[26px]">

                    <li className="mb-3">A UX/UI designer who ensures that our platform is intuitive, visually appealing, and easy to use. Every interaction is carefully designed to provide a smooth experience for our users.</li>

                    <li className="mb-3">A full-stack developer who brings technical excellence to the platform, ensuring that our tools run efficiently, calculations remain accurate, and data is processed in real-time.</li>

                    <li className="mb-3">An SEO and marketing expert who makes sure that our platform reaches the right audience. Through strategic content creation, digital marketing, and search engine optimization, we ensure that our tools are easily accessible to users worldwide.</li>

                </ul>



                <p className="text-left leading-[24px] md:leading-[26px]">

                    Together, we are on a mission to empower individuals, businesses, researchers, and travelers with financial knowledge that helps them make smarter decisions. Whether you're comparing the purchasing power of your money across different countries, checking how inflation has impacted the value of your savings over time, or converting currencies with real-time exchange rates, our tools are built to deliver accurate and meaningful insights. We continuously refine our platform to stay ahead of market trends, ensuring that you always get the best experience. At [Your Website Name], we believe that financial literacy should be simple, accessible, and available to all.

                </p>

            </div>

<Footer />

          </div>

    );

}



export default About;