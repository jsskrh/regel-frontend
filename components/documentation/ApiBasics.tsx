import Link from "next/link";
import { LightbulbIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const httpMethods = [
  {
    method: "POST",
    type: "Create",
    description:
      "Used to create new resources. For example, to send an SMS or create a contact list.",
  },
  {
    method: "GET",
    type: "Read",
    description:
      "Used to retrieve resources. For example, to fetch your message history or get user details.",
  },
  {
    method: "PUT / PATCH",
    type: "Update",
    description:
      "Used to update existing resources. For example, to modify a contact list or update your onboarding details.",
  },
  {
    method: "DELETE",
    type: "Delete",
    description:
      "Used to remove resources. For example, to delete a contact or a sender ID request.",
  },
];

const ApiBasics = () => {
  return (
    <section className="mb-40">
      <h2 className="mb-4 font-semibold text-2xl leading-7">API Basics</h2>

      <Card className="bg-[#D5EEE3] border-[#D5EEE3] my-7.5">
        <CardHeader className="p-4 pb-0 mb-1.25">
          <CardTitle className="flex items-center gap-x-1.25 text-base font-medium leading-6">
            <LightbulbIcon className="size-5" />
            Before you begin!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-base leading-6">
            You should{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              create a free Regel account
            </Link>{" "}
            that you can test the API against. We will provide you with API keys
            that you can use to make API calls.
          </p>
        </CardContent>
      </Card>

      <p className="mt-3.75">
        The Regel API gives you access to pretty much all the features you can
        use on our dashboard and lets you extend them for use in your
        application. It strives to be RESTful and is organized around the main
        resources you would be interacting with.
      </p>

      <Table className="mt-10 mb-7.5 caption-top">
        <TableCaption className="font-medium text-lg mb-4 mt-0 text-left">
          HTTP Methods
        </TableCaption>
        <TableHeader className="sr-only">
          <TableRow>
            <TableHead className="w-[70px]">Method</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {httpMethods.map((item) => (
            <TableRow
              key={item.method}
              className="even:bg-[#f5f8f9] border-transparent"
            >
              <TableCell className="align-top p-4 pl-0 space-y-1.25">
                <p className="font-medium text-neutral-800 uppercase">
                  {item.method}
                </p>
                <p className="text-sm opacity-80 text-neutral-800 uppercase">
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
    </section>
  );
};

export default ApiBasics;