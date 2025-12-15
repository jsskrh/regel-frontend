import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Intro from "@/components/home/Intro";
import WhatWeDo from "@/components/home/WhatWeDo";
// import WhyUs from "@/components/home/WhyUs";
import HowItWorks from "@/components/home/HowItWorks";
import CallToAction from "@/components/home/CallToAction";
import PricingPlan from "@/components/home/PricingPlan";
import WithRegel from "@/components/home/WithRegel";
import FAQ from "@/components/home/FAQ";
import Testimonial from "@/components/home/Testimonial";
// import Team from "@/components/home/Team";
import Integrations from "@/components/home/Integrations";

export default function Home() {
  return (
    <div className="flex flex-col bg-standard min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="min-h-screen overflow-x-clip">
          <Intro />
          <WhatWeDo />
          <HowItWorks />
          <WithRegel />
          <PricingPlan />
          <Integrations />
          <CallToAction />
          {/* <WhyUs /> */}
          <WithRegel blue />
          <FAQ />
          <Testimonial />
          {/* <Team /> */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
