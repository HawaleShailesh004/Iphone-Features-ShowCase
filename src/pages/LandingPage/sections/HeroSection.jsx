import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6 md:px-12 lg:px-20 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Section: Text Content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Experience the <span className="text-blue-600">Power of iPhone</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
            Discover how iPhone transforms your everyday life — from wellness to
            productivity and connectivity. Everything you need, right at your
            fingertips.
          </p>
          
          {/* Call-to-Action Button */}
          <div className="flex justify-center md:justify-start">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 transition duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Section: Hero Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="/images/hero.png"
            alt="iPhone"
            className="w-[300px] md:w-[400px] lg:w-[450px] rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
