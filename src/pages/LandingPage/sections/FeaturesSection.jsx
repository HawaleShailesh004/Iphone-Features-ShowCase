import React, { useState, useEffect, useCallback } from "react";
import features from "../../../data/features";
import { useInView } from "react-intersection-observer";

const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(features[0]);
  const [locked, setLocked] = useState(false);
  const featureList = features.map((f) => f.title);

  const { ref, inView } = useInView({
    threshold: 0.95, // Trigger when 95% of the section is visible
  });

  // Update current feature whenever activeIndex changes
  useEffect(() => {
    setCurrentFeature(features[activeIndex]);
  }, [activeIndex]);

  // Handle wheel scroll navigation
  const handleWheel = useCallback(
    (e) => {
      if (!locked) return;

      e.preventDefault();

      let scrollTimeout;
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 1) {
          // Scroll down
          setActiveIndex((prev) => {
            if (prev < features.length - 1) {
              return prev + 1;
            } else {
              setLocked(false); // Unlock at last feature
              return prev;
            }
          });
        } else if (e.deltaY < -1) {
          // Scroll up
          setActiveIndex((prev) => {
            if (prev > 0) {
              return prev - 1;
            } else {
              setLocked(false); // Unlock at first feature
              return prev;
            }
          });
        }
      }, 50); // Debounce scroll events
    },
    [locked]
  );

  // Add or remove wheel event listener based on section visibility
  useEffect(() => {
    if (inView) {
      setLocked(true);
      window.addEventListener("wheel", handleWheel, { passive: false });
    } else {
      setLocked(false);
      window.removeEventListener("wheel", handleWheel);
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [inView, handleWheel]);

  return (
    <div
      ref={ref}
      className={`${
        locked ? "sticky top-0" : "relative"
      } w-full min-h-screen grid grid-cols-1 md:grid-cols-3 place-items-center gap-8 px-8 my-20`}
    >
      {/* Left Section: Feature Details */}
      <div
        className="grid gap-3 md:gap-6 justify-start items-start w-[320px] animate-fadeIn"
        key={currentFeature.title}
      >
        <h1 className="text-2xl font-bold text-accent mt-5 md:mb-7">
          {`Feature No: ${activeIndex + 1}`}
        </h1>
        <h2 className="text-2xl font-semibold text-primary uppercase md:mb-5">
          {currentFeature.title}
        </h2>
        <ul className="space-y-1 text-secondary-dark leading-relaxed md:mb-15">
          {currentFeature.description.map((point, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="w-1 h-1 mt-2 rounded-full bg-secondary-light"></span>
              {point}
            </li>
          ))}
        </ul>

        {/* Navigation Arrows */}
        <div className="flex w-15 md:w-12 items-center justify-between gap-2 mt-6 h-10">
          <button
            className="cursor-pointer text-xl"
            onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
          >
            ←
          </button>
          <span className="border-1 border-accent h-9"></span>
          <button
            className="cursor-pointer text-xl"
            onClick={() =>
              setActiveIndex((prev) => Math.min(prev + 1, features.length - 1))
            }
          >
            →
          </button>
        </div>
      </div>

      {/* Center Section: iPhone Mockup */}
      <div className="relative w-full md:w-[320px] flex justify-center items-center mx-auto">
        <img
          className="w-[55%] h-[95%] md:w-[90%] md:h-[90%]"
          src="/images/iphone-mockup.png"
          alt="iPhone Mockup"
        />
        <img
          key={currentFeature.image}
          className="absolute top-[2.5%] left-1/2 transform -translate-x-1/2 w-[46%] h-[95%] md:w-[75%] md:h-[95%] rounded-[10px] md:rounded-[30px] overflow-hidden animate-fadeIn"
          src={currentFeature.image}
          alt={currentFeature.title}
        />
      </div>

      {/* Right Section: Feature List */}
      <div className="flex flex-col items-start w-[320px]">
        <h2 className="text-2xl font-bold text-primary">Feature Showcase</h2>
        <ul className="list-none md:mt-5 mt-3 text-secondary-light w-full">
          {featureList.map((feature, index) => (
            <li
              key={index}
              className={`flex items-center rounded min-h-[20px] sm:min-h-[60px] cursor-pointer w-full ${
                activeIndex === index ? "font-bold text-secondary-dark" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <span
                className={`w-0.5 h-10 mr-5 transition-colors ${
                  activeIndex === index ? "bg-accent" : ""
                }`}
              ></span>
              {`Feature ${index + 1}: ${feature}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturesSection;
