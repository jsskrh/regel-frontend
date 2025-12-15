"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const weDo = [
  {
    title: "Bulk SMS",
    id: "bulkSms",
    description:
      "Send unlimited messages to your customers at the click of a button.",
    image: "/heroes/chat.jpg",
  },
  {
    title: "OTP Notifications",
    id: "otp",
    description: "Enable verification by sending secure one-time passcodes.",
    image: "/heroes/otp.jpg",
  },
  {
    title: "International Airtime & E-sim",
    id: "airtime",
    description: "Coming soon",
    image: "/heroes/smiling.jpg",
  },
  {
    title: "E-pin & Universal recharge cards",
    id: "recharge",
    description: "Coming soon",
    image: "/heroes/pin.jpg",
  },
];

const WhatWeDo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const paragraphRefs = useRef([]);
  const markerRefs = useRef([]);
  const imageRefs = useRef([]);
  const mobileContainerRef = useRef(null);
  const mobileTitleRefs = useRef([]);
  const mobileDescRefs = useRef([]);
  const mobileImageRefs = useRef([]);
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  // Function to set active item and reset timer
  const setActive = (index: number) => {
    setActiveIndex(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      startAutoChange();
    }
  };

  // Auto-change function
  const startAutoChange = () => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % weDo.length);
    }, 8000);
  };

  // Initialize and clean up
  useEffect(() => {
    startAutoChange();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Initial setup of heights for paragraphs
  useEffect(() => {
    // Initialize heights for paragraphs
    paragraphRefs.current.forEach((pRef, index) => {
      if (!pRef) return;

      // Store the actual height for later use
      if (!pRef.dataset.height) {
        gsap.set(pRef, { height: "auto" });
        pRef.dataset.height = pRef.offsetHeight;
        gsap.set(pRef, {
          height: index === activeIndex ? pRef.dataset.height : 0,
          overflow: "hidden",
        });
      }

      // Set initial visibility of images
      if (imageRefs.current[index]) {
        gsap.set(imageRefs.current[index], {
          opacity: index === activeIndex ? 1 : 0,
          display: index === activeIndex ? "block" : "none",
        });
      }
    });

    // Initialize mobile elements
    if (mobileContainerRef.current) {
      // Set initial states for mobile elements
      mobileTitleRefs.current.forEach((ref, index) => {
        if (!ref) return;
        gsap.set(ref, {
          y: index === activeIndex ? 0 : 30,
          opacity: index === activeIndex ? 1 : 0,
          display: index === activeIndex ? "block" : "none",
        });
      });

      mobileDescRefs.current.forEach((ref, index) => {
        if (!ref) return;
        gsap.set(ref, {
          y: index === activeIndex ? 0 : 30,
          opacity: index === activeIndex ? 1 : 0,
          display: index === activeIndex ? "block" : "none",
        });
      });

      mobileImageRefs.current.forEach((ref, index) => {
        if (!ref) return;
        gsap.set(ref, {
          opacity: index === activeIndex ? 1 : 0,
          display: index === activeIndex ? "block" : "none",
        });
      });
    }
  }, []);

  // Using useGSAP for desktop animations
  useGSAP(
    () => {
      // Animate active item
      paragraphRefs.current.forEach((pRef, index) => {
        if (!pRef) return;

        if (index === activeIndex) {
          // Highlight active marker
          if (markerRefs.current[index]) {
            gsap.to(markerRefs.current[index], {
              backgroundColor: "#2BAF75",
              width: "0.125rem",
              duration: 0.5,
            });
          }

          // Show active paragraph
          gsap.to(pRef, {
            height: pRef.dataset.height,
            opacity: 1,
            duration: 0.5,
          });

          // Show active image
          if (imageRefs.current[index]) {
            gsap.set(imageRefs.current[index], { display: "block" });
            gsap.to(imageRefs.current[index], {
              opacity: 1,
              duration: 0.5,
            });
          }
        } else {
          // Make inactive marker less prominent
          if (markerRefs.current[index]) {
            gsap.to(markerRefs.current[index], {
              backgroundColor: "#555",
              width: "0.125rem",
              duration: 0.5,
            });
          }

          // Hide inactive paragraph
          gsap.to(pRef, {
            height: 0,
            opacity: 0,
            duration: 0.5,
          });

          // Hide inactive image
          if (imageRefs.current[index]) {
            gsap.to(imageRefs.current[index], {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                gsap.set(imageRefs.current[index], { display: "none" });
              },
            });
          }
        }
      });
    },
    { scope: containerRef, dependencies: [activeIndex] }
  );

  // Using useGSAP for mobile animations
  useGSAP(
    () => {
      if (!mobileContainerRef.current) return;

      // Animate mobile elements
      mobileTitleRefs.current.forEach((ref, index) => {
        if (!ref) return;

        if (index === activeIndex) {
          // Show current title with slide up animation
          gsap.set(ref, { display: "block" });
          gsap.fromTo(
            ref,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 0.1 }
          );
        } else {
          // Hide other titles
          gsap.to(ref, {
            y: -30,
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              gsap.set(ref, { display: "none", y: 30 });
            },
          });
        }
      });

      mobileDescRefs.current.forEach((ref, index) => {
        if (!ref) return;

        if (index === activeIndex) {
          // Show current description with slide up animation
          gsap.set(ref, { display: "block" });
          gsap.fromTo(
            ref,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 0.2 }
          );
        } else {
          // Hide other descriptions
          gsap.to(ref, {
            y: -30,
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              gsap.set(ref, { display: "none", y: 30 });
            },
          });
        }
      });

      mobileImageRefs.current.forEach((ref, index) => {
        if (!ref) return;

        if (index === activeIndex) {
          // Show current image with fade in
          gsap.set(ref, { display: "block" });
          gsap.to(ref, { opacity: 1, duration: 0.6 });
        } else {
          // Hide other images
          gsap.to(ref, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              gsap.set(ref, { display: "none" });
            },
          });
        }
      });
    },
    { scope: mobileContainerRef, dependencies: [activeIndex] }
  );

  return (
    <div className="flex flex-col gap-y-8.75 lg:gap-15.5 px-6 lg:px-25 bg-nighblack pt-21.75 lg:pt-30 text-white pb-15.75 lg:pb-40.75">
      <h2
        id="services"
        className="font-medium text-[2.5rem] lg:text-5xl lg:text-center leading-[120%] lg:leading-16"
      >
        Regel is building a plethora <br /> of products for businesses
      </h2>

      <div className="lg:hidden" ref={mobileContainerRef}>
        <div className="flex flex-col gap-y-8">
          <div className="relative">
            <div className="w-0.5 rounded-4xl h-full bg-[#2BAF75] absolute top-0" />
            <div className="flex flex-col relative overflow-hidden h-30 pl-5">
              {weDo.map((item, index) => (
                <h3
                  key={item.id + "-title"}
                  className="mb-2 font-semibold text-[1.4875rem] leading-[1.95rem] tracking-[-0.015rem] absolute top-0 left-5 w-full"
                  ref={(el) => (mobileTitleRefs.current[index] = el)}
                >
                  {item.title}
                </h3>
              ))}
              <div className="mt-8 relative h-16">
                {weDo.map((item, index) => (
                  <p
                    key={item.id + "-desc"}
                    className="text-lg leading-[150%] text-[#eee] max-w-62 absolute top-0 left-0 w-full"
                    ref={(el) => (mobileDescRefs.current[index] = el)}
                  >
                    {item.description}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full aspect-350/300 overflow-hidden relative">
            {weDo.map((item, index) => (
              <div
                key={item.id + "-image-container"}
                className="absolute top-0 left-0 w-full h-full"
                ref={(el) => (mobileImageRefs.current[index] = el)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 350px, 440px"
                  className="object-cover rounded-3xl overflow-clip"
                />
              </div>
            ))}
          </div>
          {/* <div className="flex justify-center gap-2 mt-4">
            {weDo.map((_, index) => (
              <div
                key={`dot-${index}`}
                className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-300 ${
                  index === activeIndex ? "bg-[#2BAF75]" : "bg-[#555]"
                }`}
                onClick={() => setActive(index)}
              />
            ))}
          </div> */}
        </div>
      </div>

      <div
        className="lg:flex justify-between items-center hidden"
        ref={containerRef}
      >
        <div className="flex flex-col items-start gap-y-9.5">
          {weDo.map(({ id, title, description }, index) => (
            <div
              className="cursor-pointer relative"
              key={id}
              onClick={() => setActive(index)}
            >
              <div
                className={`w-0.5 rounded-4xl h-full ${
                  index === activeIndex ? "bg-[#2BAF75]" : "bg-[#555]"
                } absolute top-0 bottom-0`}
                ref={(el) => (markerRefs.current[index] = el)}
              />
              <div className="flex flex-col pl-10">
                <h3
                  className={`mb-2 font-semibold text-[1.4875rem] leading-[1.95rem] tracking-[-0.015rem] lg:whitespace-nowrap ${
                    index === activeIndex ? "text-white" : "text-gray-300"
                  }`}
                  id={id}
                >
                  {title}
                </h3>
                <p
                  className="text-lg leading-[150%] text-[#eee] max-w-62 overflow-hidden"
                  ref={(el) => (paragraphRefs.current[index] = el)}
                >
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative w-full max-w-xl h-171 aspect-663/684">
          {weDo.map(({ image, title }, index) => (
            <div
              className="absolute top-0 left-0 w-full h-full overflow-hidden"
              key={title}
              ref={(el) => (imageRefs.current[index] = el)}
              style={{
                opacity: index === 0 ? 1 : 0,
                display: index === 0 ? "block" : "none",
              }}
            >
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 350px, 663px"
                className="object-cover rounded-3xl overflow-clip"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
