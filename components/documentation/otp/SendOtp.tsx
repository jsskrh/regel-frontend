import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CodeBlock } from "@/components/common/CodeBlock";

const headers = [
  {
    header: "x-api-key",
    type: "string",
    description: "Set value to your API key.",
  },
  {
    header: "content-type",
    type: "string",
    description: "Set value to application/json.",
  },
];

const body = [
  {
    header: "phoneNumber",
    type: "string",
    description: "Recipient phone number in E.164 format.",
  },
  {
    header: "messageTemplate",
    type: "string",
    description: "The message content including the <OTP> placeholder.",
  },
];

const requestFormat = `curl "https://api.regeltechnology.com/otp/send" 
  -H "x-api-key: YOUR_API_KEY" 
  -H "Content-Type: application/json" 
  -d '{ 
    "phoneNumber": "+2348012345678", 
    "messageTemplate": "Your OTP code is <OTP>"
  }' 
  -X POST`;

const sampleResponse = `{
    "message": "OTP sent successfully.",
    "success": true
  }`;

const SendOtp = () => {
  return (
    <section className="mb-20">
      <div className="mb-10">
        <h2 className="font-semibold mb-4 text-2xl" id="sendOtp">
          Send OTP
        </h2>
        <p>Generate and send a One-Time Password to a recipient.</p>
      </div>

      <Table className="mt-10 mb-7.5 caption-top">
        <TableCaption className="font-medium text-lg mb-4 mt-0 text-left">
          Headers
        </TableCaption>
        <TableHeader className="sr-only">
          <TableRow>
            <TableHead className="w-[70px]">Headers</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {headers.map((item) => (
            <TableRow
              key={item.header}
              className="even:bg-[#f5f8f9] border-transparent"
            >
              <TableCell className="align-top p-4 pl-0 space-y-1.25">
                <p className="font-medium text-neutral-800 lowercase">
                  {item.header}
                </p>
                <p className="text-sm opacity-80 text-neutral-800 lowercase">
                  {item.type}
                </p>
              </TableCell>
              <TableCell className="align-top p-4">
                {item.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table className="mt-10 mb-7.5 caption-top">
        <TableCaption className="font-medium text-lg mb-4 mt-0 text-left">
          Body Parameters
        </TableCaption>
        <TableHeader className="sr-only">
          <TableRow>
            <TableHead className="w-[70px]">Parameter</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((item) => (
            <TableRow
              key={item.header}
              className="even:bg-[#f5f8f9] border-transparent"
            >
              <TableCell className="align-top p-4 pl-0 space-y-1.25">
                <p className="font-medium text-neutral-800 lowercase">
                  {item.header}
                </p>
                <p className="text-sm opacity-80 text-neutral-800 lowercase">
                  {item.type}
                </p>
              </TableCell>
              <TableCell className="align-top p-4">
                {item.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CodeBlock
        code={requestFormat}
        language="cURL"
        method="post"
        title="/otp/send"
      />

      <CodeBlock
        code={sampleResponse}
        language="JSON"
        title="Sample Response"
      />
    </section>
  );
};

export default SendOtp;