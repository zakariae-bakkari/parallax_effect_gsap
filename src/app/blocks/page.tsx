"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import React, { useEffect, useState } from "react";
import { Block } from "@/components/block";

gsap.registerPlugin(ScrollTrigger);

export default function Blocks() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useGSAP(() => {
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Get device-specific values
    const getScrollDistance = () => {
      if (isMobile) return 200;
      if (isTablet) return 250;
      return 300;
    };

    const getScrollEnd = () => {
      if (isMobile) return "+=600vw";
      if (isTablet) return "+=700vw";
      return "+=800vw";
    };

    const getVerticalDistance = () => {
      if (isMobile) return 150;
      if (isTablet) return 175;
      return 200;
    };

    // Horizontal scroll (right to left)
    ScrollTrigger.create({
      trigger: ".blocks-containers",
      start: "top top",
      end: getScrollEnd(),
      scrub: 1.5,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        gsap.set(".blocks-containers", {
          x: `${-getScrollDistance() * self.progress}vw`,
        });
      },
    });

    // Horizontal scroll (left to right)
    ScrollTrigger.create({
      trigger: ".blocks-containers-lefts",
      start: "top top",
      end: getScrollEnd(),
      scrub: 1.5,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        gsap.set(".blocks-containers-lefts", {
          x: `${getScrollDistance() * self.progress}vw`,
        });
      },
    });

    // Vertical scroll
    ScrollTrigger.create({
      trigger: ".blocks-containers-top",
      start: "top top",
      end: "+=300vh",
      scrub: 1.5,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        gsap.set(".blocks-containers-top-inner", {
          y: `${getVerticalDistance() * self.progress}vh`,
        });
      },
    });

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, isTablet]);

  return (
    <section className="container">
      {/* First horizontal section (right to left) */}
      <div className="blocks-containers">
        <Block
          className="bg-indigo-600"
          title="Horizontal Scroll"
          description="Slide through vibrant panels as you scroll down. This technique creates an immersive horizontal movement controlled by vertical scrolling."
        >
          <svg
            className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-12 md:h-12 text-white opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Block>

        <Block
          className="bg-purple-700"
          title="Interactive Panels"
          description="Each panel reveals new content as you navigate through the experience, creating a story-telling sequence that unfolds naturally."
        >
          <svg
            className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-12 md:h-12 text-white opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Block>

        <Block
          className="bg-pink-600"
          title="GSAP Magic"
          description="Powered by GSAP's ScrollTrigger for smooth animations that respond precisely to your scrolling position."
        >
          <svg
            className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-12 md:h-12 text-white opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Block>
      </div>

      {/* Transition section */}
      <div className="keep-scrolling bg-amber-500 top-[200vh]">
        <h2 className="text-[8vw] md:text-[10vw] text-white text-center font-bold px-4">
          Keep Scrolling
        </h2>
      </div>

      {/* Second horizontal section (left to right) */}
      <div className="blocks-containers-lefts">
        <div className="block-left bg-emerald-600">
          <svg
            className="absolute top-4 left-4 md:top-8 md:left-8 w-8 h-8 md:w-12 md:h-12 text-white opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M5 12L12 5M5 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-center px-4">
            Reverse Direction
          </h2>
          <p className="text-white text-sm md:text-lg lg:text-xl max-w-2xl text-center px-4">
            Now we&apos;re moving in the opposite direction, demonstrating the
            versatility of scroll-triggered animations.
          </p>
        </div>
        <div className="block-left bg-teal-700">
          <svg
            className="absolute top-4 left-4 md:top-8 md:left-8 w-8 h-8 md:w-12 md:h-12 text-white opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M5 12L12 5M5 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-center px-4">
            Seamless Transitions
          </h2>
          <p className="text-white text-sm md:text-lg lg:text-xl max-w-2xl text-center px-4">
            The panels flow smoothly as you scroll, creating a cohesive
            experience that feels natural and intuitive.
          </p>
        </div>
        <div className="block-left bg-cyan-600">
          <svg
            className="absolute top-4 left-4 md:top-8 md:left-8 w-8 h-8 md:w-12 md:h-12 text-white opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M5 12L12 5M5 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-center px-4">
            Dynamic Content
          </h2>
          <p className="text-white text-sm md:text-lg lg:text-xl max-w-2xl text-center px-4">
            Each section reveals unique information while maintaining visual
            consistency throughout the experience.
          </p>
        </div>
      </div>

      {/* Second transition section */}
      <div className="keep-scrolling bg-orange-500 top-[500vh]">
        <h2 className="text-[8vw] md:text-[10vw] text-white text-center font-bold px-4">
          Almost There!
        </h2>
      </div>

      {/* Vertical scroll section */}
      <div className="blocks-containers-top">
        <div className="blocks-containers-top-inner">
          <div className="bg-blue-700 block-top">
            <svg
              className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-12 md:h-12 text-white opacity-70"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 19V5M12 5L19 12M12 5L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-center px-4">
              Vertical Motion
            </h2>
            <p className="text-white text-sm md:text-lg lg:text-xl max-w-2xl text-center px-4">
              Now we&apos;re exploring vertical scrolling effects, pushing
              boundaries of interactive web experiences.
            </p>
          </div>
          <div className="block-top bg-violet-800">
            <svg
              className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-12 md:h-12 text-white opacity-70"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 19V5M12 5L19 12M12 5L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-center px-4">
              Scroll Synergy
            </h2>
            <p className="text-white text-sm md:text-lg lg:text-xl max-w-2xl text-center px-4">
              The combination of different scroll directions creates a
              multi-dimensional user experience.
            </p>
          </div>
          <div className="bg-rose-700 block-top">
            <svg
              className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-12 md:h-12 text-white opacity-70"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 19V5M12 5L19 12M12 5L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-center px-4">
              Final Section
            </h2>
            <p className="text-white text-sm md:text-lg lg:text-xl max-w-2xl text-center px-4">
              You&apos;ve reached the end of this scrolling journey. The
              possibilities with GSAP and React are endless!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}