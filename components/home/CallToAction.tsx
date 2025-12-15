import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const components = [
  {
    title: "User-Friendly Interface",
    description:
      "Our easy to use system helps you perform tasks end to end with ease.",
    image: "green-heart.svg",
  },
  {
    title: "Personalized Messaging",
    description:
      "Easily customize your outgoing messages to your target customers.",
    image: "green-sms.svg",
  },
  {
    title: "Real-Time Reports",
    description:
      "Get real time feedback on every implementation or on-going tasks.",
    image: "green-bell.svg",
  },
  {
    title: "Pay-As-You-Go",
    description:
      "Pay for the services you use and get feedback on payment capabilities on the SMS interface.",
    image: "green-pay-money.svg",
  },
  {
    title: "Network Reach",
    description:
      "All networks are available on our system making it easier to reach various clients.",
    image: "green-network.svg",
  },
  {
    title: "Support",
    description:
      "We have a 24/7 support staff ready to provide solutions to any tickets raised.",
    image: "green-support.svg",
  },
];

const CallToAction = () => {
  return (
    <div className="py-25 lg:px-35 lg:py-24.25 flex max-lg:flex-col gap-y-12 gap-x-12 items-center lg:items-stretch px-6 bg-white">
      <div className="aspect-334/560 lg:aspect-444/560 relative w-full">
        <Image
          src={`/heroes/yellow.jpg`}
          alt={`image`}
          fill
          sizes="(max-width: 768px) 334px, 444px"
          className="object-cover rounded-3xl overflow-clip"
        />
      </div>

      <div className="flex flex-col max-lg:items-center max-lg:text-center lg:justify-between">
        {/* <div className="lg:flex-1 flex flex-col lg:justify-between"> */}
        <h2 className="font-semibold text-[2.25rem] leading-[150%] mb-6">
          Create a unique & personalized messaging with a trusted global
          partner.
        </h2>

        <div className="grid gap-y-12 lg:grid-cols-3 lg:gap-6 w-full mb-12">
          {components.map((item) => (
            <Component data={item} key={item.title} />
          ))}
        </div>
        {/* </div> */}

        <Link href="/signup" className="max-lg:mt-13">
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
  );
};

const Component = ({ data: { title, description, image } }) => {
  return (
    <div className="flex max-lg:flex-col gap-x-4 gap-y-2 tracking-[-5%] max-lg:items-center w-full">
      <Image
        className="size-10 lg:size-6"
        src={`/icons/${image}`}
        alt={`${title} icon`}
        width={40}
        height={40}
      />
      <div className="flex flex-col gap-y-2">
        <h3 className="text-xl lg:text-lg leading-5.5 font-medium">{title}</h3>
        <p className="text-[#53514E] leading-[100%]">{description}</p>
      </div>
    </div>
  );
};

export default CallToAction;
