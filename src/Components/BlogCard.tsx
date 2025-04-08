import React from 'react';
import Footer from './Footer.tsx';
import { Link } from 'react-router-dom';

function BlogList() {
  const blogs = [
    { title: "What is Purchasing Power Parity (PPP) and Why Does It Matter?", desc: "What is Purchasing Power Parity (PPP) and Why Does It Matter?", date: "24 Mar 2025", time: "6 min" },
    { title: "Currency Exchange vs. PPP: What''s the Difference?", desc: "Exchange rates fluctuate daily, but PPP gives a more stable measure of real purchasing power. Discover how these two concepts affect your financial decisions.", date: "24 Mar 2025", time: "6 min" },
    { title: "How Inflation Affects Your Money Over Time", desc: "Inflation reduces the value of money, making things more expensive over the years. See how historical inflation trends impact savings and purchasing power.", date: "24 Mar 2025", time: "8 min" },
    { title: "How Inflation Affects Your Money Over Time", desc: "Inflation reduces the value of money, making things more expensive over the years. See how historical inflation trends impact savings and purchasing power.", date: "24 Mar 2025", time: "8 min" },
  ];

  return (
    <div className="bg-gradient-to-r from-[#EDEDED] to-[#D9D9D9] rounded-b-3xl"> 
    <div className="max-w-screen-lg mx-auto py-8 px-4 md:px-2 ">
      <h2 className="text-4xl md:text-6xl mb-8 md:mb-[112px] font-serif">Blogs</h2>
      <div className="flex flex-wrap -mx-2 gap-4">
        {blogs.map((blog, index) => (
          <div 
            key={index} 
            className="w-full md:w-[48%] p-2 overflow-hidden h-[450px]"
          >
            <div className="bg-gray-300 rounded-xl h-[250px]"> 
            
            </div>
            <div className="py-4 text-left"> 
              <h3 className="text-xl font-inter font-semibold mb-2">{blog.title}</h3>
              <p className="text-base text-[#252525] font-inter mb-4">{blog.desc}</p>
              <div className="flex justify-between text-base text-[#555555] font-inter">
                <ul className="flex gap-8">
                {blog.date}
                <li className="list-disc">{blog.time}</li>
                <Link to="/pppArticle">details</Link>
                </ul>
              
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
    </div>
  );
}

export default BlogList;