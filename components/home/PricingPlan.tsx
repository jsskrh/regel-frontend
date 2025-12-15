import Image from "next/image";
import { Button } from "@/components/ui/button";

const PricingPlan = () => {
  return (
    <div className="py-25 lg:pt-30 lg:pb-41.75 flex flex-col gap-y-6 lg:gap-y-9.25 px-3 lg:px-25 lg:w-fit lg:mx-auto items-center">
      <div className="max-w-221.25 text-center space-y-2">
        <h2 className="font-medium text-4xl leading-[100%] tracking-[-5%]">
          Flexible pricing
        </h2>
        <p className="text-lg leading-[120%] lg:leading-[150%] text-[#53514E] tracking-[-0.0125rem]">
          Choose a plan that fits your event integration needs. Pricing is per
          connection, there is no limit ot how many connections you can have.
          Questions?{" "}
          <span className="underline text-[#1C1917]">Contact us</span>.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-y-16 gap-x-12 w-full">
        {[
          { title: "Early bird", isActive: true },
          // { title: "Essential", isActive: false },
          // { title: "Plus", isActive: false },
        ].map((plan, i) => (
          <div className="rounded-3xl p-8 flex flex-col gap-12 bg-[#D5EEE3] w-full lg:col-start-2">
            <div className="flex flex-col">
              <span className="font-medium leading-[100%] tracking-[0.0125rem] mb-5.5">
                {plan.title}
              </span>
              <span className="font-extrabold text-nighblack leading-[120%] text-[2.75rem] tracking-[0%] space-x-1 mb-4.5">
                ₦3.8
                <span className="text-sm text-[#53514E] tracking-[-0.03rem]">
                  per sms
                </span>
              </span>
              <span className="leading-6.75 text-[#53514E] tracking-[-0.0125rem]">
                Prices are prone to change from time to time
              </span>
            </div>
            <div className="space-y-4 leading-[150%]">
              <ul className="space-y-4 list-image-[url('/icons/check-black.svg')] ml-7">
                {[
                  "Standard delivery speeds",
                  "Basic analytics dashboard",
                  "Email support",
                  "Single user account",
                  "Message history",
                ].map((feature) => (
                  <li className="pl-2" key={feature}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              className="leading-[100%] tracking-[-0.0125rem] text-base rounded-full drop-shadow-md"
              variant={plan.isActive ? "primary" : "white"}
            >
              {plan.isActive ? "Claim this price" : "Coming soon"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlan;
