import TitleHeader from "@/components/documentation/TitleHeader";
import SendSms from "@/components/documentation/sms/SendSms";

const Sms = () => {
  return (
    <div>
      <TitleHeader
        title="SMS"
        subtitle="The SMS API allows you to send SMS to single or bulk recipients."
      />

      <SendSms />
    </div>
  );
};

export default Sms;