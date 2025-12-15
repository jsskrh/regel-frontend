import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I get started with sending SMS?",
    a: "To get started, create a free account on our platform. Once registered, you can fund your wallet, request a custom sender ID, and start sending SMS messages instantly. Our intuitive dashboard makes it easy to manage your campaigns and track results.",
  },
  {
    q: "What types of messages can I send?",
    a: "You can send a variety of messages, including transactional SMS (e.g., OTPs, alerts), promotional SMS (e.g., marketing campaigns), and bulk SMS. Our platform supports both text and Unicode messages, ensuring compatibility with all languages.",
  },
  {
    q: "How do I track the performance of my SMS campaigns?",
    a: "Our platform provides real-time analytics and detailed reports for every SMS campaign. You can track delivery rates, open rates, and customer engagement metrics directly from your dashboard. Advanced analytics are available in our Pro and Enterprise plans.",
  },
  {
    q: "Is my data secure on your platform?",
    a: "Yes, we prioritize data security. All messages and customer data are encrypted during transmission and storage. We also comply with global data protection regulations to ensure your information is safe and secure.",
  },
  {
    q: "What happens if my SMS fails to deliver?",
    a: "If an SMS fails to deliver, our system automatically retries delivery for a set period. You can also view the status of each message in your dashboard. If delivery issues persist, our support team is available to assist you.",
  },
  {
    q: "Do you offer support for international SMS?",
    a: "Yes, we support global SMS delivery to over 200 countries. Our platform ensures seamless connectivity and competitive pricing for international messaging. Check our coverage list for specific country details.",
  },
];

const FAQ = () => {
  return (
    <div className="py-25 px-1.5 lg:px-25 flex flex-col items-center">
      <div className="flex flex-col gap-y-2 lg:gap-y-6 mb-16 text-center max-w-4/5 lg:max-w-3xl">
        <h2 className="text-[2.25rem] leading-11 tracking-[-5%] font-semibold">
          Frequently asked questions
        </h2>
        <p className="font-medium text-xl leading-7.5 tracking-[-5%] text-[#53514E]">
          Everything you need to know about the product and billing.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-5 lg:max-w-3xl"
      >
        {faqs.map((faq, i) => (
          <AccordionItem
            value={`item-${i}`}
            key={i}
            className="bg-white p-6 rounded-lg gap-3 border-0 data-[state=open]:shadow-xl shadow-[#2BAF75]"
          >
            <AccordionTrigger className="hover:no-underline p-0 items-start">
              <span className="font-medium text-xl leading-7.5 no-underline text-nighblack">
                {faq.q}
              </span>
            </AccordionTrigger>
            <AccordionContent className="leading-7.5 font-medium text-[#53514E] text-xl">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
