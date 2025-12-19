import Link from "next/link";
import { OctagonAlertIcon, LightbulbIcon } from "lucide-react";
import TitleHeader from "@/components/documentation/TitleHeader";
import PaginationType from "@/components/documentation/PaginationType";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Pagination = () => {
  return (
    <div>
      <TitleHeader title="Pagination" />
      <section className="mb-20">
        <p className="mt-3.75">
          Pagination allows you to efficiently retrieve large sets of data from
          the Regel API. Instead of returning all results at once, which
          could be slow and resource intensive, pagination breaks the sets of data
          into smaller chunks before sending them. This approach improves
          performance, reduces network load, and enhances the overall user
          experience when working with large datasets.
        </p>
      </section>
      <PaginationType />
    </div>
  );
};

export default Pagination;