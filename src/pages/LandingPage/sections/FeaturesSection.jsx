import React, { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import features from "../../../data/features";

const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const sectionRef = useRef(null);

  const featureList = features.map((f) => f.title);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px -100% 0px",
  });

  const goToIndex = (index) => {
    setActiveIndex(index);
    setScrolling(true);

    if (sectionRef.current) {
      const offsetTop = sectionRef.current.offsetTop;
      const targetScroll = offsetTop + index * window.innerHeight;

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }

    setTimeout(() => setScrolling(false), 500);
  };

  const handleWheel = useCallback(
    (e) => {
      if (scrolling) return;

      if (e.deltaY > 20 && activeIndex < features.length - 1) {
        e.preventDefault();
        goToIndex(activeIndex + 1);
      }
      if (e.deltaY < -20 && activeIndex > 0) {
        e.preventDefault();
        goToIndex(activeIndex - 1);
      }
    },
    [scrolling, activeIndex, features.length]
  );

  useEffect(() => {
    if (inView) {
      window.addEventListener("wheel", handleWheel, { passive: false });
    } else {
      window.removeEventListener("wheel", handleWheel);
    }
    return () => window.removeEventListener("wheel", handleWheel);
  }, [inView, handleWheel]);

  const currentFeature = features[activeIndex];

  return (
    <div
      ref={(el) => {
        ref(el);
        sectionRef.current = el;
      }}
      className="relative w-full"
      style={{ height: `${features.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 place-items-center gap-8 px-8">
          
          {/* Feature Showcase (first on mobile, right on desktop) */}
          <div className="flex flex-col items-start w-[320px] order-1 md:order-3">
            <h2 className="text-lg md:text-2xl font-bold text-primary">
              Feature Showcase
            </h2>
            <ul className="list-none md:mt-5 mt-3 text-secondary-light w-full">
              {featureList.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-center rounded text-sm min-h-[10px] sm:min-h-[60px] cursor-pointer w-full select-none transition-all animate-fadeIn ${
                    activeIndex === index ? "font-bold text-secondary-dark" : ""
                  }`}
                  onClick={() => goToIndex(index)}
                >
                  <span
                    className={`w-0.5 h-7 md:h-10 mr-5 transition-colors ${
                      activeIndex === index ? "bg-accent" : ""
                    }`}
                  />
                  {`Feature ${index + 1}: ${feature}`}
                </li>
              ))}
            </ul>
          </div>

          {/* Description (second on mobile, left on desktop) */}
          <div
            className="grid gap-3 md:gap-6 justify-start items-start w-[320px] animate-fadeIn order-2 md:order-1"
            key={currentFeature.title}
          >
            <h1 className="text-lg md:text-2xl font-bold text-accent md:mt-5 md:mb-7">
              {`Feature No: ${activeIndex + 1}`}
            </h1>
            <h2 className="text-lg md:text-2xl font-semibold text-primary uppercase md:mb-5">
              {currentFeature.title}
            </h2>
            <ul className="space-y-1 text-secondary-dark leading-relaxed md:mb-15">
              {currentFeature.description.map((point, index) => (
                <li key={index} className="flex items-start gap-1 md:gap-2 text-sm">
                  <span className="w-1 h-1 mt-2 rounded-full bg-secondary-light" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="flex w-15 md:w-12 items-center justify-between gap-2 mt-6 h-10">
              <button
                className="cursor-pointer text-xl"
                onClick={() => goToIndex(Math.max(activeIndex - 1, 0))}
              >
                ←
              </button>
              <span className="border-1 border-accent h-9" />
              <button
                className="cursor-pointer text-xl"
                onClick={() =>
                  goToIndex(Math.min(activeIndex + 1, features.length - 1))
                }
              >
                →
              </button>
            </div>
          </div>

          {/* Image (last on mobile, center on desktop) */}
          <div className="relative w-full md:w-[320px] flex justify-center items-center mx-auto order-3 md:order-2 select-none">
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
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
