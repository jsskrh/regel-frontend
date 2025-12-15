import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-y-12 lg:gap-y-8 px-5 py-12 lg:pt-15 lg:pb-20 lg:px-16 bg-white">
      <div className="">
        <Link href={`/`} className="flex mb-5 lg:mb-6">
          <Image
            className="size-15"
            src="/logo.png"
            alt="Regel technology logo"
            width={60}
            height={60}
            priority
          />
        </Link>
        <div className="flex max-lg:flex-col gap-y-5 mb-5 lg:mb-12 lg:gap-x-12">
          <div className="flex flex-col gap-y-2 lg:w-72">
            <span className="text-[2rem] leading-[120%] font-bold">
              1 Billion+
            </span>
            <span className="text-lg leading-[150%]">
              Over 1 billion transactions processed successfully.
            </span>
          </div>
          <div className="flex flex-col gap-y-2 lg:w-72">
            <span className="text-[2rem] leading-[120%] font-bold">
              100+Networks
            </span>
            <span className="text-lg leading-[150%]">
              Deliver to over 100 mobile networks globally.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
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
      </div>

      <div className="flex flex-col gap-y-8 lg:gap-y-6">
        <h2 className="font-bold text-[2.5rem] md:text-[5rem] lg:text-[7rem] xl:text-[9rem] whitespace-nowrap lg:font-extrabold leading-[120%]">
          Regel Technology
        </h2>
        <div className="pt-6 lg:pt-8 border-t-[0.5px] border-nighblack flex flex-col lg:flex-row-reverse lg:justify-between gap-y-8">
          <ul className="flex max-lg:flex-col gap-y-4 lg:gap-x-6">
            <li className="leading-[150%] text-sm underline">
              <Link href={`/`}>Privacy Policy</Link>
            </li>
            <li className="leading-[150%] text-sm underline">
              <Link href={`/`}>Terms of Service</Link>
            </li>
            <li className="leading-[150%] text-sm underline">
              <Link href={`/`}>Cookies Settings</Link>
            </li>
          </ul>
          <span className="text-sm leading-[150%]">
            © 2025 Regel. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
