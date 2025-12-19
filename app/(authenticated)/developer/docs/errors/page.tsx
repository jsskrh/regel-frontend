import Link from "next/link";
import { OctagonAlertIcon, LightbulbIcon } from "lucide-react";
import TitleHeader from "@/components/documentation/TitleHeader";
import HttpCodes from "@/components/documentation/HttpCodes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Errors = () => {
  return (
    <div>
      <TitleHeader title="Errors" />
      <section className="mb-20">
        <p className="mt-3.75">
          Regel's API is RESTful and as such, uses conventional HTTP response
          codes to indicate the success or failure of requests.
        </p>
      </section>
      <HttpCodes />
    </div>
  );
};

export default Errors;