import Link from "next/link";
import Image from "next/image";
import Brands from "@/components/home/Brands";
import { Button } from "@/components/ui/button";

const Intro = () => {
  return (
    <div className="pt-37.5 lg:pt-46 mb-19.25 lg:mb-14">
      <div className="px-6 lg:px-25 mb-25 text-center flex flex-col items-center">
        <div className="flex flex-col items-center gap-y-4 mb-12 lg:mb-25">
          <p className="text-[2.5rem] lg:text-[5rem] leading-[120%] lg:leading-[120%] font-medium tracking-tight lg:tracking-[-5%]">
            We are your communication solution partner on a global scale.
          </p>
          <p className="text-lg leading-[150%] lg:text-2xl lg:leading-9 max-w-225">
            Connect with your customers through SMS, OTP and explore unlimited
            possibilities across the globe.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-y-8 gap-x-16.5 mb-12">
          <div className="flex flex-col items-center gap-y-2">
            <p className="text-[2rem] leading-[120%] lg:text-6xl lg:leading-[120%] font-medium">
              1B +
            </p>
            <p className="font-medium text-lg lg:text-[1.25rem] leading-[150%] max-w-60 lg:max-w-74.5">
              Over 1 billion sms transactions processed successfully.
            </p>
          </div>
          <div className="flex flex-col items-center gap">
            <p className="text-[2rem] leading-[120%] lg:text-6xl lg:leading-18 font-medium">
              100+Networks
            </p>
            <p className="font-medium text-lg lg:text-[1.25rem] leading-[150%] max-w-52 lg:max-w-69.5">
              Deliver to over 100 mobile networks globally.
            </p>
          </div>
        </div>

        <Link href="/signup">
          <Button
            className="font-bold text-2xl leading-6 tracking-[-5%] gap-0.5"
            variant="primary"
            size="lg"
          >
            Begin sending
            <Image
              className="size-6"
              src="/icons/chevron-right-white.svg"
              alt="chevron right icon"
              width={20}
              height={20}
              priority
            />
          </Button>
        </Link>
      </div>

      <Brands />
    </div>
  );
};

export default Intro;
