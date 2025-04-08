// import React from 'react';

// const Hero = () => {
//   return (
//     <div className="text-center py-8 relative bg-gradient-to-r from-[#EDEDED] to-[#D9D9D9]">
//       <img className="absolute" src="Worldmap.png" alt="World Map" />

    
//       <div className="hidden md:block">
//         <svg
//           className="absolute w-full h-auto max-w-[416px] max-h-[215px] left-[189px]"
//           viewBox="0 0 252 181"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d="M251.887 3L249 5.88675L246.113 3L249 0.113249L251.887 3ZM249 3.5H203.5V2.5H249V3.5ZM168 39V54.25H167V39H168ZM131.5 90.75H0V89.75H131.5V90.75ZM168 54.25C168 74.4084 151.658 90.75 131.5 90.75V89.75C151.106 89.75 167 73.8561 167 54.25H168ZM203.5 3.5C183.894 3.5 168 19.3939 168 39H167C167 18.8416 183.342 2.5 203.5 2.5V3.5Z" fill="url(#paint0_linear_28_13290)"/>
//           <path d="M251.887 177.5L249 174.613L246.113 177.5L249 180.387L251.887 177.5ZM249 177H203.5V178H249V177ZM168 141.5V126.25H167V141.5H168ZM131.5 89.75H0V90.75H131.5V89.75ZM168 126.25C168 106.092 151.658 89.75 131.5 89.75V90.75C151.106 90.75 167 106.644 167 126.25H168ZM203.5 177C183.894 177 168 161.106 168 141.5H167C167 161.658 183.342 178 203.5 178V177Z" fill="url(#paint1_linear_28_13290)"/>
//           <defs>
//             <linearGradient id="paint0_linear_28_13290" x1="249" y1="46.625" x2="0" y2="46.625" gradientUnits="userSpaceOnUse">
//               <stop stop-color="#555555" />
//               <stop offset="1" stop-color="#BBBBBB" stop-opacity="0" />
//             </linearGradient>
//             <linearGradient id="paint1_linear_28_13290" x1="249" y1="133.875" x2="0" y2="133.875" gradientUnits="userSpaceOnUse">
//               <stop stop-color="#555555" />
//               <stop offset="1" stop-color="#BBBBBB" stop-opacity="0" />
//             </linearGradient>
//           </defs>
//         </svg>

//         <svg
//           className="absolute right-[189px] w-full h-auto max-w-[416px] max-h-[215px]"
//           viewBox="0 0 252 181"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d="M0.113249 3L3 5.88675L5.88675 3L3 0.113249L0.113249 3ZM3 3.5H48.5V2.5H3V3.5ZM84 39V54.25H85V39H84ZM120.5 90.75H252V89.75H120.5V90.75ZM84 54.25C84 74.4084 100.342 90.75 120.5 90.75V89.75C100.894 89.75 85 73.8561 85 54.25H84ZM48.5 3.5C68.1061 3.5 84 19.3939 84 39H85C85 18.8416 68.6584 2.5 48.5 2.5V3.5Z" fill="url(#paint0_linear_28_13293)"/>
//           <path d="M0.113249 177.5L3 174.613L5.88675 177.5L3 180.387L0.113249 177.5ZM3 177H48.5V178H3V177ZM84 141.5V126.25H85V141.5H84ZM120.5 89.75H252V90.75H120.5V89.75ZM84 126.25C84 106.092 100.342 89.75 120.5 89.75V90.75C100.894 90.75 85 106.644 85 126.25H84ZM48.5 177C68.1061 177 84 161.106 84 141.5H85C85 161.658 68.6584 178 48.5 178V177Z" fill="url(#paint1_linear_28_13293)"/>
//           <defs>
//             <linearGradient id="paint0_linear_28_13293" x1="3" y1="46.625" x2="252" y2="46.625" gradientUnits="userSpaceOnUse">
//               <stop stop-color="#555555" />
//               <stop offset="1" stop-color="#BBBBBB" stop-opacity="0" />
//             </linearGradient>
//             <linearGradient id="paint1_linear_28_13293" x1="3" y1="133.875" x2="252" y2="133.875" gradientUnits="userSpaceOnUse">
//               <stop stop-color="#555555" />
//               <stop offset="1" stop-color="#BBBBBB" stop-opacity="0" />
//             </linearGradient>
//           </defs>
//         </svg>
//       </div>

//       <h1 className="text-[50px] md:text-[80px] font-serif text-[#252525] leading-tight">Purchasing power</h1>
//       <h2 className="text-4xl md:text-6xl font-Fraunces text-[#252525] uppercase mb-4 leading-tight">PARITY</h2>
//       <p className="text-lg md:text-lg text-[#555555] max-w-2xl mx-auto">
//         Convert currencies based on <span className="font-bold">purchasing power</span>, compare living costs, and make informed financial decisions.{' '}
//         <span className="bg-gradient-to-b from-[#5AC57B] to-[#15B146] bg-clip-text text-transparent font-bold">Try it now!</span>
//       </p>
//     </div>
//   );
// };

// export default Hero;

import React from 'react';

const Hero = () => {
  return (
    <div className="text-center py-8 relative bg-gradient-to-r from-[#EDEDED] to-[#D9D9D9]">
<img className="absolute" src="Worldmap.png" alt="World Map" />
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <svg
          className="absolute w-full h-auto max-w-[416px] max-h-[215px] left-[10%] top-[15%]"
          viewBox="0 0 252 181"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M251.887 3L249 5.88675L246.113 3L249 0.113249L251.887 3ZM249 3.5H203.5V2.5H249V3.5ZM168 39V54.25H167V39H168ZM131.5 90.75H0V89.75H131.5V90.75ZM168 54.25C168 74.4084 151.658 90.75 131.5 90.75V89.75C151.106 89.75 167 73.8561 167 54.25H168ZM203.5 3.5C183.894 3.5 168 19.3939 168 39H167C167 18.8416 183.342 2.5 203.5 2.5V3.5Z" fill="url(#paint0_linear_28_13290)"/>
          <path d="M251.887 177.5L249 174.613L246.113 177.5L249 180.387L251.887 177.5ZM249 177H203.5V178H249V177ZM168 141.5V126.25H167V141.5H168ZM131.5 89.75H0V90.75H131.5V89.75ZM168 126.25C168 106.092 151.658 89.75 131.5 89.75V90.75C151.106 90.75 167 106.644 167 126.25H168ZM203.5 177C183.894 177 168 161.106 168 141.5H167C167 161.658 183.342 178 203.5 178V177Z" fill="url(#paint1_linear_28_13290)"/>
          <defs>
            <linearGradient id="paint0_linear_28_13290" x1="249" y1="46.625" x2="0" y2="46.625" gradientUnits="userSpaceOnUse">
              <stop stop-color="#555555" />
              <stop offset="1" stop-color="#BBBBBB" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear_28_13290" x1="249" y1="133.875" x2="0" y2="133.875" gradientUnits="userSpaceOnUse">
              <stop stop-color="#555555" />
              <stop offset="1" stop-color="#BBBBBB" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          className="absolute right-[10%] top-[15%] w-full h-auto max-w-[416px] max-h-[215px]"
          viewBox="0 0 252 181"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0.113249 3L3 5.88675L5.88675 3L3 0.113249L0.113249 3ZM3 3.5H48.5V2.5H3V3.5ZM84 39V54.25H85V39H84ZM120.5 90.75H252V89.75H120.5V90.75ZM84 54.25C84 74.4084 100.342 90.75 120.5 90.75V89.75C100.894 89.75 85 73.8561 85 54.25H84ZM48.5 3.5C68.1061 3.5 84 19.3939 84 39H85C85 18.8416 68.6584 2.5 48.5 2.5V3.5Z" fill="url(#paint0_linear_28_13293)"/>
          <path d="M0.113249 177.5L3 174.613L5.88675 177.5L3 180.387L0.113249 177.5ZM3 177H48.5V178H3V177ZM84 141.5V126.25H85V141.5H84ZM120.5 89.75H252V90.75H120.5V89.75ZM84 126.25C84 106.092 100.342 89.75 120.5 89.75V90.75C100.894 90.75 85 106.644 85 126.25H84ZM48.5 177C68.1061 177 84 161.106 84 141.5H85C85 161.658 68.6584 178 48.5 178V177Z" fill="url(#paint1_linear_28_13293)"/>
          <defs>
            <linearGradient id="paint0_linear_28_13293" x1="3" y1="46.625" x2="252" y2="46.625" gradientUnits="userSpaceOnUse">
              <stop stop-color="#555555" />
              <stop offset="1" stop-color="#BBBBBB" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear_28_13293" x1="3" y1="133.875" x2="252" y2="133.875" gradientUnits="userSpaceOnUse">
              <stop stop-color="#555555" />
              <stop offset="1" stop-color="#BBBBBB" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <h1 className="text-[40px] md:text-[60px] lg:text-[80px] font-serif text-[#252525] leading-tight">Purchasing power</h1>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-Fraunces text-[#252525] uppercase mb-4 leading-tight">PARITY</h2>
      <p className="text-lg md:text-xl lg:text-lg text-[#555555] max-w-2xl mx-auto">
        Convert currencies based on <span className="font-bold">purchasing power</span>, compare living costs, and make informed financial decisions.{' '}
        <span className="bg-gradient-to-b from-[#5AC57B] to-[#15B146] bg-clip-text text-transparent font-bold">
          <span className="md:inline">Try it now!</span>
        </span>
      </p>
    </div>
  );
};

export default Hero;