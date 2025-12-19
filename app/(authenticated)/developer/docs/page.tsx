import TitleHeader from "@/components/documentation/TitleHeader";
import ApiBasics from "@/components/documentation/ApiBasics";
import SampleRequests from "@/components/documentation/SampleRequests";
import RequestsAndResponses from "@/components/documentation/RequestsAndResponses";
import MetaObject from "@/components/documentation/MetaObject";

const API = () => {
  return (
    <div>
      <TitleHeader
        title="Introduction"
        subtitle="Learn how to integrate our APIs into your application."
      />
      <ApiBasics />
      <SampleRequests />
      <RequestsAndResponses />
      <MetaObject />
    </div>
  );
};

export default API;
