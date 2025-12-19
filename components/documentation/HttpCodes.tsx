import { CodeBlock } from "@/components/common/CodeBlock";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const codes = [
  {
    key: "200",
    description:
      "Request was successful and intended action was carried out. Note that we will always send a 200 if a charge or verify request was made. Do check the data object to know how the charge went (i.e. successful or failed).",
  },
  {
    key: "201",
    description: "A resource has successfully been created.",
  },
  {
    key: "400",
    description:
      "A validation or client side error occurred and the request was not fulfilled.",
  },
  {
    key: "401",
    description:
      "The request was not authorized. This can be triggered by passing an invalid secret key in the authorization header or the lack of one.",
  },
  {
    key: "404",
    description:
      "Request could not be fulfilled as the request resource does not exist.",
  },
  {
    key: "5xx",
    description:
      "Request could not be fulfilled due to an error on Paystack's end. This shouldn't happen so please report as soon as you encounter any instance of this.",
  },
];

const HttpCodes = () => {
  return (
    <section className="mb-40">
      <Table className="mt-10 mb-7.5 caption-top">
        <TableCaption className="font-medium text-lg mb-4 mt-0 text-left">
          HTTP Codes
        </TableCaption>
        <TableHeader className="sr-only">
          <TableRow>
            <TableHead className="w-[70px]">Code</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {codes.map((item) => (
            <TableRow
              key={item.key}
              className="even:bg-[#f5f8f9] border-transparent"
            >
              <TableCell className="align-top p-4 pl-0 space-y-1.25">
                <p className="font-medium text-neutral-800">{item.key}</p>
              </TableCell>
              <TableCell className="align-top p-4">
                {item.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default HttpCodes;
