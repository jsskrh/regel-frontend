"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const testimonials = [
  {
    content:
      "As someone constantly seeking reliable tools to streamline business communication, I gave Regel Technology a shot after spotting their site. Their promise of connecting businesses with customers via SMS, OTP, and global solutions hooked me. The clean interface, easy SMS scheduling, and touted 1B+ transactions impressed me right away. It's user-friendly and seems built for retention-focused strategies. I'd give it 4/5—great start",
    name: "Jay Okwuchi",
    position: "",
    company: "Bracken",
    logo: "bracken-white.png",
    sizes: [48, 53],
    image: "jay-okwuchi.png",
  },
];

const Testimonial = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="bg-nighblack text-white px-5 lg:px-16 py-16 lg:py-28">
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
          {testimonials.map((testimonial, i) => (
            <CarouselItem className="basis-full lg:basis-[95%] pl-8" key={i}>
              <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-20 gap-y-12">
                <div className="w-full aspect-400/340 lg:aspect-616/640 lg:rounded-3xl relative">
                  <Image
                    className="max-w-full lg:w-full h-auto"
                    src={`/people/jay-okwuchi.png`}
                    alt="testimonial image"
                    width={400}
                    height={340}
                  />
                </div>
                <div className="space-y-6">
                  <div className="flex gap-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Image
                        src="/icons/star-green.svg"
                        alt="star icon"
                        width={20}
                        height={18.89}
                        key={i}
                      />
                    ))}
                  </div>
                  <p className="font-bold text-xl lg:text-2xl leading-[140%]">
                    "{testimonial?.content}"
                  </p>
                  <div className="flex items-center gap-x-4">
                    <div className="flex flex-col">
                      <span className="leading-[150%] font-semibold">
                        {testimonial?.name}
                      </span>
                      <span className="leading-[150%]">
                        {testimonial?.position}, {testimonial?.company}
                      </span>
                    </div>
                    <div className="h-15 w-px bg-white" />
                    <Image
                      src={`/logos/${testimonial?.logo ?? "white-webflow.png"}`}
                      alt="logo"
                      width={testimonial?.sizes[0] ?? 115.7}
                      height={testimonial?.sizes[1] ?? 19.29}
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex items-center justify-between max-lg:sr-only">
          <div className="flex items-center gap-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`size-2 border rounded-full border-black ${
                  current === i + 1 ? "bg-black" : ""
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <CarouselPrevious className="static translate-0 size-12" />
            <CarouselNext className="static translate-0 size-12" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Testimonial;
