import Link from "next/link";
import { OctagonAlertIcon, LightbulbIcon } from "lucide-react";
import TitleHeader from "@/components/documentation/TitleHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Authentication = () => {
  return (
    <div>
      <TitleHeader title="Authentication" />
      <p className="mt-3.75">
        Authenticate your API calls by including your API key in the{" "}
        <code>x-api-key</code> header of every request you make. You can manage
        your API keys{" "}
        <Link
          href="/developer/api-key"
          className="text-blue-600 hover:underline"
        >
          from the dashboard
        </Link>
        .
      </p>
      <p className="mt-3.75">
        We provide API keys that must be included in all requests to our
        endpoints. These keys are tied to your account and control access to our
        services. Keep your API keys secure at all times.
      </p>
      <Card className="bg-[#e9f7ff] border-[#e9f7ff] my-7.5">
        <CardHeader className="p-4 pb-0 mb-1.25">
          <CardTitle className="flex items-center gap-x-1.25 text-base font-medium leading-6">
            <OctagonAlertIcon className="size-5" />
            Secure your secret key
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-base leading-6">
            Do not commit your secret keys to git, or use them in client-side
            code.
          </p>
        </CardContent>
      </Card>
      <p className="mt-3.75">
        API key headers should be in the following format:{" "}
        <code>x-api-key: YOUR_API_KEY</code>
      </p>

      <Card className="bg-[#D5EEE3] border-[#D5EEE3] my-7.5">
        <CardHeader className="p-4 pb-0 mb-1.25">
          <CardTitle className="flex items-center gap-x-1.25 text-base font-medium leading-6">
            <LightbulbIcon className="size-5" />
            Sample Authorization Header
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-base leading-6">
            x-api-key: rk_live_5abc123def456ghi789jkl...
          </p>
        </CardContent>
      </Card>
      <p className="mt-3.75">
        API requests made without authentication will fail with the status code{" "}
        <code>401: Unauthorized</code>. All API requests must be made over
        HTTPS.
      </p>
      <Card className="bg-[#e9f7ff] border-[#e9f7ff] my-7.5">
        <CardHeader className="p-4 pb-0 mb-1.25">
          <CardTitle className="flex items-center gap-x-1.25 text-base font-medium leading-6">
            <OctagonAlertIcon className="size-5" />
            Secure your requests
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-base leading-6">
            Ensure your server verifies the SSL connection to our API endpoints.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Authentication;