"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { horizontalLoop } from "@/lib/helpers/gsap";

const WithRegel = ({ blue }: { blue?: boolean }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".text-line");
      const loop = horizontalLoop(boxes, { repeat: -1 });
    },
    {
      scope: containerRef,
    }
  );

  return (
    <div
      className={`flex w-full overflow-x-hidden text-white text-2xl leading-7 ${
        blue ? "bg-[#2B5EA9]" : "bg-black"
      }`}
    >
      <div
        className="inline-flex items-center gap-x-6 whitespace-nowrap py-2 px-3"
        ref={containerRef}
      >
        <Component />
        <Component />
        <Component />
        <Component />
      </div>
    </div>
  );
};

const Component = () => {
  return (
    <div className="flex items-center gap-x-6 text-line relative first:pl-12">
      <span>With Regel - communication just got faster and efficient</span>
      <Image src={`/icons/star.svg`} alt={`star icon`} width={22} height={22} />
    </div>
  );
};

export default WithRegel;
