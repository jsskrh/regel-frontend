import TitleHeader from "@/components/documentation/TitleHeader";
import SendOtp from "@/components/documentation/otp/SendOtp";
import VerifyOtp from "@/components/documentation/otp/VerifyOtp";

const Otp = () => {
  return (
    <div>
      <TitleHeader
        title="OTP"
        subtitle="The OTP API allows you to create, verify, and manage One-Time Passwords for user authentication and verification."
      />

      <SendOtp />
      <VerifyOtp />
    </div>
  );
};

export default Otp;