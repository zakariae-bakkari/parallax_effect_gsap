"use client";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  useGSAP(() => {
    // Define the cards with their respective end translation and rotation values
    const cards = [
      { id: "#card1", endTranlateX: -1600, rotate: 60 },
      { id: "#card2", endTranlateX: -1600, rotate: -30 },
      { id: "#card3", endTranlateX: -1600, rotate: 45 },
      { id: "#card4", endTranlateX: -1600, rotate: -30 },
    ];

    // Create a horizontal scroll effect for the wrapper container
    ScrollTrigger.create({
      trigger: ".wrapper-container",
      start: "top top",
      end: "+=900vw",
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        gsap.to(".wrapper-container", {
          x: `${-120 * self.progress}%`,
          duration: 2,
          ease: "power3.out",
        });
      },
    });

    // Animate each card that contains an image
    cards.forEach((card) => {
      ScrollTrigger.create({
        trigger: card.id,
        start: "top 45%",//that mean 
        end: "+=1200vw",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(card.id, {
            x: card.endTranlateX * self.progress,
            rotation: card.rotate * self.progress,
            duration: 1,
            ease: "power3.out",
          });
        },
      });
    });

    // Animate the outer section with a fade-in effect on scroll
    const paragraph_splited = new SplitText(".outer p", {
      type: "words,chars",
    });

    // Create a sequence that reveals words one by one as you scroll
    paragraph_splited.words.forEach((word, index) => {
      gsap.set(word, { opacity: 0.1 });

      // Create a scroll trigger for each word
      ScrollTrigger.create({
        trigger: ".outer p",
        start: `top ${80 - index * 2}%`, // Stagger the start positions
        end: `top ${60 - index * 2}%`, // Stagger the end positions
        scrub: true,
        onEnter: () => {
          gsap.to(word, {
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(word, {
            opacity: 0.1,
            duration: 0.5,
            ease: "power3.in",
          });
        },
      });
    });
  }, []);
  return (
    <div className="container  max-sm:">
     
      {/* <div className="w-full relative flex items-center justify-center overflow-hidden"> */}
        <section className=" wrapper-container top-0  ">
          <h1 className="title">
            Welcome to<strong>GSAP</strong>&apos;s amazing
          </h1>
          <div className="card-container" id="card1">
            <Image fill loading="lazy" src="/image1.jpg" alt="images" className="" />
          </div>
          <div className="card-container" id="card2">
            <Image fill loading="lazy" src="/image2.jpg" alt="images" />
          </div>
          <div className="card-container" id="card3">
            <Image fill loading="lazy" src="/image3.jpg" alt="images" />
          </div>
          <div className="card-container" id="card4">
            <Image fill loading="lazy" src="/image4.jpg" alt="images" />
          </div>
        </section>
      {/* </div> */}
      <section className="outer">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
          molestiae tenetur velit, non ipsum in officia maxime rem atque odio
          error libero perspiciatis, expedita nisi sequi exercitationem id
          placeat perferendis?
        </p>
      </section>
      <footer className="flex items-center justify-center flex-col px-4 py-8">
        <span className="text-white">Made with 💜 by Zakariae</span>
        <Link
          href="https://zakariaebakkari.vercel.app"
          className="text-blue-500 text-xl"
          target="-blank"
          rel="noopener noreferrer"
        >
          Check my portfolio
        </Link>
      </footer>
    </div>
  );
}
