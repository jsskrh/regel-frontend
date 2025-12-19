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

const keys = [
  {
    key: "data",
    type: "array",
    description:
      "An array containing the actual records for the current page.",
  },
  {
    key: "total",
    type: "number",
    description:
      "This is the total number of records available across all pages.",
  },
  {
    key: "page",
    type: "number",
    description:
      "The current page number being returned. Default: 1",
  },
  {
    key: "limit",
    type: "number",
    description:
      "The maximum number of records returned in this request. Default: 10",
  },
];

const MetaObject = () => {
  const responseFormat = `{
  "data": [...],
  "total": 25,
  "page": 1,
  "limit": 10
}`;

  return (
    <section className="mb-40">
      <h2 className="mb-4 font-semibold text-2xl leading-7">Paginated Response</h2>

      <p className="mt-3.75">
        For endpoints that return multiple records, the response is structured to include
        pagination metadata alongside the data. This allows you to navigate through large
        datasets efficiently.
      </p>

      <Table className="mt-10 mb-7.5 caption-top">
        <TableCaption className="font-medium text-lg mb-4 mt-0 text-left">
          Response Keys
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

export default MetaObject;