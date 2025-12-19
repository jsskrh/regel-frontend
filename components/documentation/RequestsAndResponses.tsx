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

const keys = [
  {
    key: "success / ok",
    type: "boolean",
    description:
      "Some endpoints return a success flag to indicate the outcome of the operation.",
  },
  {
    key: "message",
    type: "string",
    description:
      "A human-readable summary of the response or error details.",
  },
  {
    key: "data",
    type: "object / array",
    description:
      "For list or detail requests, this key contains the actual record(s). Note that some endpoints may return the data directly at the top level.",
  },
];

const RequestsAndResponses = () => {
  const responseFormat = `{
  "message": "Operation successful",
  "data": { ... }
}`;

  return (
    <section className="mb-40">
      <h2 className="mb-4 font-semibold text-2xl leading-7">
        Requests and Responses
      </h2>

      <p className="mt-3.75">
        Both request body data and response data are formatted as JSON. Content
        type for responses will always be <code>application/json</code>.
        While formats may vary by endpoint, they generally follow this structure:
      </p>

      <Table className="mt-10 mb-7.5 caption-top">
        <TableCaption className="font-medium text-lg mb-4 mt-0 text-left">
          Common Keys
        </TableCaption>
        <TableHeader className="sr-only">
          <TableRow>
            <TableHead className="w-[70px]">Key</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keys.map((item) => (
            <TableRow
              key={item.key}
              className="even:bg-[#f5f8f9] border-transparent"
            >
              <TableCell className="align-top p-4 pl-0 space-y-1.25">
                <p className="font-medium text-neutral-800 lowercase">
                  {item.key}
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

      <CodeBlock code={responseFormat} language="JSON" />
    </section>
  );
};

export default RequestsAndResponses;