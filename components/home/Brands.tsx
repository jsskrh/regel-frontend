"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { horizontalLoop } from "@/lib/helpers/gsap";

const brands = [
  { title: "bang bet", src: "bang-bet.png", width: 192, height: 44 },
  { title: "bracken", src: "bracken.png", width: 128.56, height: 143 },
  {
    title: "china skyline telecom",
    src: "china-skyline-telecom.png",
    width: 311,
    height: 67,
  },
  { title: "wordmark", src: "wordmark.png", width: 410, height: 114 },
  { title: "velexgroup", src: "velexgroup.png", width: 200, height: 200 },
  { title: "vesper", src: "vesper.png", width: 188, height: 160 },
  { title: "oraimo", src: "oraimo.png", width: 294, height: 171 },
  { title: "net", src: "net.png", width: 225, height: 225 },
  { title: "p", src: "p.png", width: 225, height: 225 },
  { title: "bang bet", src: "bang-bet.png", width: 192, height: 44 },
  { title: "bracken", src: "bracken.png", width: 128.56, height: 143 },
  {
    title: "china skyline telecom",
    src: "china-skyline-telecom.png",
    width: 311,
    height: 67,
  },
  { title: "wordmark", src: "wordmark.png", width: 410, height: 114 },
  { title: "velexgroup", src: "velexgroup.png", width: 200, height: 200 },
  { title: "vesper", src: "vesper.png", width: 188, height: 160 },
  { title: "oraimo", src: "oraimo.png", width: 294, height: 171 },
  { title: "net", src: "net.png", width: 225, height: 225 },
  { title: "p", src: "p.png", width: 225, height: 225 },
];

const Brands = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".brand");
      const loop = horizontalLoop(boxes, { repeat: -1 });
    },
    {
      scope: containerRef,
    }
  );

  return (
    <div className="flex w-full overflow-x-hidden h-40.5">
      <div
        className="inline-flex items-center whitespace-nowrap"
        ref={containerRef}
      >
        {brands.map((logo, i) => (
          <div className="basis-[95%] aspect-316/164 mx-4 bg-white relative rounded-3xl brand first:pl-8 h-full flex items-center justify-center">
            <Image
              key={`${logo.title}-${i}`}
              className="object-contain max-h-full max-w-full px-5"
              src={`/logos/${logo.src}`}
              alt={`${logo.title} logo`}
              width={logo.width}
              height={logo.height}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
