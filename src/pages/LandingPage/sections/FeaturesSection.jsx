import React, { useState, useEffect, useCallback } from "react";
import features from "../../../data/features";
import { useInView } from "react-intersection-observer";

const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [featureList, setFeatureList] = useState(features.map((f) => f.title));
  const [currentFeature, setCurrentFeature] = useState(features[0]);
  const [featureData, setFeatureData] = useState(features);

  const [locked, setLocked] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.95, // 95% visible
  });

  useEffect(() => {
    setCurrentFeature(features[activeIndex]);
  }, [activeIndex]);

  const handleWheel = useCallback(
    (e) => {
      if (!locked) return;

      e.preventDefault(); // stop page scroll

      // A little delay to prevent rapid-fire scrolling
      // This is optional but can improve user experience
      let scrollTimeout;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 1) {
          // Check for any downward scroll
          // scroll down
          setActiveIndex((prev) => {
            if (prev < features.length - 1) {
              return prev + 1;
            } else {
              // This is the key: Unlock ONLY when trying to scroll PAST the last item
              setLocked(false);
              return prev;
            }
          });
        } else if (e.deltaY < -1) {
          // Check for any upward scroll
          // scroll up
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
      }, 50); // 50ms debounce
    },
    [locked] // Dependency is correct
  );

  useEffect(() => {
    // MODIFICATION HERE:
    // Lock the component as soon as it's in view.
    // Let the handleWheel function decide when to unlock.
    if (inView) {
      setLocked(true);
      window.addEventListener("wheel", handleWheel, { passive: false });
    } else {
      // This part remains the same, to unlock if the user scrolls away
      setLocked(false);
      window.removeEventListener("wheel", handleWheel);
    }

    // Cleanup function
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [inView, handleWheel]); // Dependencies are correct

  return (
    <div
      ref={ref}
      // The class logic remains correct
      className={`${
        locked ? "sticky top-0" : "relative"
      } w-full h-screen grid grid-cols-3 place-items-center gap-8 px-8 mb-20`}
    >
      {/* Left Section: Feature Details */}
      <div className="flex flex-col gap-6 justify-start items-start w-[320px] animate-fadeIn" key={currentFeature.title}>
        <h1 className="text-2xl font-bold text-accent mb-7">
          {`Feature No: ${activeIndex + 1}`}
        </h1>
        <h2 className="text-2xl font-semibold text-primary uppercase mb-5">
          {currentFeature.title}
        </h2>
        <ul className="space-y-1 text-secondary-dark leading-relaxed mb-15">
          {currentFeature.description.map((point, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="w-1 h-1 mt-2 rounded-full bg-secondary-light"></span>
              {point}
            </li>
          ))}
        </ul>
        {/* Navigation Arrows */}
        <div className="flex items-center justify-between gap-2 mt-6 h-10">
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
      <div className="relative w-[320px]">
        <img
          className="w-[90%] h-[90%]"
          src="/images/iphone-mockup.png"
          alt="iPhone Mockup"
        />
        <img
          key={currentFeature.image}
          className="absolute top-[2.5%] left-[8%] w-[75%] h-[95%] rounded-[30px] overflow-hidden animate-fadeIn"
          src={currentFeature.image}
          alt={currentFeature.title}
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-start w-[320px]">
        <h2 className="text-2xl font-bold text-primary">Feature Showcase</h2>
        <ul className="list-none mt-5 text-secondary-light w-full">
          {featureList.map((feature, index) => (
            <li
              key={index}
              className={`flex items-center rounded min-h-[60px] cursor-pointer w-full ${
                activeIndex === index ? "font-bold text-primary" : "" // Added text-primary for better visibility
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <span
                className={`w-0.5 h-10 mr-5 transition-colors ${
                  // Added transition
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
