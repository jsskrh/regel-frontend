"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import gsap from "gsap";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const steps = [
  {
    title: "Create an account",
    subtitle: "Start by registering an account.",
    image: "create.png",
  },
  {
    title: "Request for custom sender ID",
    subtitle: "We provide a unique sender ID for your account.",
    image: "sender-id.png",
  },
  {
    title: "Fund your wallet",
    subtitle: "Fund your wallet securely using paystack secure gateway.",
    image: "fund.png",
  },
  {
    title: "Send messages and view instant reports",
    subtitle: "Start sending sms across 100+ networks.",
    image: "sms.png",
  },
];

const HowItWorks = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const titleRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      const currentSlide = api.selectedScrollSnap();
      setCurrent(currentSlide + 1);

      // Update track width
      // gsap.fromTo(
      //   trackRef.current,
      //   {
      //     width: "0%",
      //     duration: 1,
      //     ease: "power2.out",
      //   },
      //   {
      //     width: "100%",
      //     duration: 1,
      //     ease: "power2.out",
      //   }
      // );
    });
  }, [api]);

  return (
    <div className="py-10.5 px-6 lg:px-25 lg:py-27">
      <h2 className="font-medium text-4xl lg:text-6xl tracking-[-0.125rem] leading-16.75 mb-12">
        Create an account.
      </h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 10000,
          }),
        ]}
        setApi={setApi}
        className="flex flex-col gap-8"
      >
        <CarouselContent className="-ml-8">
          {steps.map((step, index) => (
            <Step
              key={step.title}
              data={{ ...step, index }}
              isActive={index === current - 1}
              total={steps.length}
              api={api}
            />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

const Step = ({
  data: { image, title, subtitle, index },
  isActive,
  total,
  api,
}) => {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    // Reset all tracks first
    gsap.set(trackRef.current, { width: "0%" });

    // Handle the initial state
    const currentSlide = api.selectedScrollSnap();
    if (currentSlide === index) {
      gsap.to(trackRef.current, {
        width: "100%",
        duration: 1,
        ease: "power2.out",
      });
    }

    // Set up listener for when slide changes begin
    const handleScrollStart = () => {
      console.log("scroll");

      // Reset the track width at the start of scrolling
      if (api.selectedScrollSnap() - 1 === index) {
        // Only animate if we're moving away from this slide
        // gsap.to(trackRef.current, { width: "0%", duration: 0.3 });
        // gsap.fromTo(
        //   trackRef.current,
        //   { width: "0%" },
        //   { width: "100%", duration: 0.1, ease: "power2.out" }
        // );
      }
    };

    // Set up listener for when slide changes complete
    const handleSelect = () => {
      console.log("select", index);

      const currentSlide = api.selectedScrollSnap() - 1;
      if (currentSlide === index) {
        //   // This slide is becoming active, animate track
        gsap.fromTo(
          trackRef.current,
          { width: "0%" },
          { width: "100%", duration: 0.1, ease: "power2.out" }
        );
      }
    };

    // Add event listeners
    api.on("scroll", handleScrollStart);
    api.on("select", handleSelect);

    // Remove event listeners on cleanup
    return () => {
      api.off("scroll", handleScrollStart);
      api.off("select", handleSelect);
    };
  }, [api, index]);

  return (
    <CarouselItem className="basis-full lg:basis-[35%] pl-8" key={title}>
      <div className="flex flex-col gap-y-12">
        <div className="aspect-[370.2/300] lg:aspect-469/380 relative">
          <Image
            src={`/heroes/${image}`}
            alt={`${title} image`}
            fill
            sizes="(max-width: 768px) 370.2px, 469px"
            className="object-contain rounded-3xl overflow-clip"
          />
        </div>

        <div className="flex items-center relative">
          <div className="rounded-full size-25 border-4 border-black bg-white flex items-center justify-center">
            <span>{index + 1}</span>
          </div>
          <div className="h-0.5 flex-1 bg-white track relative">
            <div
              ref={trackRef}
              className="absolute top-0 left-0 h-full w-0 inner-track bg-black"
            />
          </div>
        </div>

        <div className="space-y-1">
          <p className="font-bold text-2xl tracking-[-5%] leading-[140%]">
            {title}
          </p>
          <p className="text-lg tracking-[-5%] leading-[150%]">{subtitle}</p>
        </div>
      </div>
    </CarouselItem>
  );
};

export default HowItWorks;
