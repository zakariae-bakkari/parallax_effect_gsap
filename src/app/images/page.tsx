"use client";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger,SplitText);
export default function ImagesPage() {
  const imageslist = [
    { id: 1, src: "/image1.jpg", alt: "Image 1", title: "Image 1" },
    { id: 2, src: "/image2.jpg", alt: "Image 2", title: "Image 2" },
    { id: 3, src: "/image3.jpg", alt: "Image 3", title: "Image 3" },
    { id: 4, src: "/image4.jpg", alt: "Image 4", title: "Image 4" },
    { id: 5, src: "/image1.jpg", alt: "Image 1", title: "Image 5" },
    { id: 6, src: "/image2.jpg", alt: "Image 2", title: "Image 6" },
  ];
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".wrapper-container",
      start: "top top",
      end: "+=800vw",
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        gsap.to(".wrapper-container", {
          x: `${-490 * self.progress}vw`,
          duration: 1,
          ease: "power3.out",
        });
      },
    });

    // animation for the image that scale up and fill the screen 

    ScrollTrigger.create({
      trigger: "#slide1",
      start: "top top",
      end: "+=100%",
      scrub: 1,
      pin: true, 
  
      onUpdate: (self) => {
        gsap.to(".scaling-image", {
          width: `${50 + self.progress * 50}%`,
          height: `${30 + self.progress * 70}%`,
          borderRadius: 0,
          duration: 1,
          ease: "power3.out",
        });
      },
    });

    const h2_splited = new SplitText(".slide h2", {
      type: "words,chars",
    });

    h2_splited.words.forEach((word, index) => {
      gsap.set(word, { opacity: 0.1 });
      ScrollTrigger.create({
        trigger: ".slide h2",
        start: `bottom ${80 - index * 2}%`, // Stagger the start positions
        end: `top ${60 - index * 2}%`, // Stagger the end positions
        scrub: 1,
        onEnter: () => {
          gsap.to(word, {
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        }
        ,
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
    <section className="container">
      <div className="wrapper-container  flex items-center justify-center gap-8 px-4 top-0 h-[100vh]">
        {imageslist.map((image) => (
          <div
            key={image.id}
            className="card-image w-[100vw] h-[90vh] overflow-hidden rounded-lg shadow-lg relative"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={image.id <= 2}
              loading={image.id <= 2 ? "eager" : "lazy"}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <h2 className="absolute-center select-none text-white font-bold text-7xl px-4 py-2 z-10">
              {image.title}
            </h2>
          </div>
        ))}
      </div>
      <div
        className="slide min-h-screen absolute top-[190vh] h-screen w-full flex items-center justify-center overflow-hidden"
        id="slide1"
      >
        <div className="w-[800px] h-[300px] scaling-image">
          <Image
            src={"/image1.jpg"}
            alt="Image 1"
            width={800}
            height={600}
            className="object-cover rounded-2xl "
            priority={true}
            loading={"eager"}
          />{" "}
          <h2 className="absolute-center text-white font-bold text-4xl px-4 py-2 z-10">
            Scroll down to see the image scale up and fill the screen with a
          </h2>
          <div className="bg-black/40 backdrop:blur-2xl absolute-center w-full h-full"></div>
        </div>
      </div>

      <div className="h-screen  absolute top-[390vh] w-full flex items-center justify-center">
        <h2 className="text-[20vw]">Thank you for scrolling!</h2>
      </div>
    </section>
  );
}
