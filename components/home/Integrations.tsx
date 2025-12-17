import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Integrations = () => {
  return (
    <div className="bg-[#D5EEE3] pb-12">
      <div className="bg-[#216A4A] min-h-140 relative pt-30 pb-16">
        <div className="flex flex-col gap-y-4 items-center text-white text-center px-7.5">
          <div className="bg-[#2BAF75] rounded-full w-fit text-xs font-medium tracking-[-5%] uppercase px-10 py-1.5 leading-4">
            100 networks available
          </div>
          <h2 className="font-semibold leading-12 text-4xl tracking-[-5%]">
            Combine. Connect. Communciate.
          </h2>
          <p className="leading-5.5 text-xl tracking-[-5%] lg:leading-2.75rem">
            Enjoy seamless connectivity by having access to over 100+ networks
            via our sms platform
          </p>
          <Link href="/register">
            <Button
              className="font-bold text-xl leading-6 tracking-[-5%] gap-0.5 border-white"
              variant="outline"
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
        <Image
          src="/layers/isps.png"
          alt="internet service providers"
          width={1440}
          height={564}
          className="w-360 overflow-x-hidden aspect-1440/564 mx-auto hidden lg:block"
        />
        <Image
          src="/layers/isps-mobile.png"
          alt="internet service providers"
          width={393}
          height={564}
          className="w-full overflow-x-hidden aspect-393/564 mx-auto lg:hidden  top-0 left-0"
        />
      </div>
      <Image
        src="/layers/green-curve.png"
        alt="Green curve"
        width={1440}
        height={100}
        className="w-360 overflow-x-hidden h-25 mx-auto max-w-none max-lg:relative max-lg:left-1/2 max-lg:-translate-x-1/2"
      />
    </div>
  );
};

export default Integrations;
