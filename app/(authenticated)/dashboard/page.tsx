import DataCards from "@/components/dashboard/DataCards";
import Groups from "@/components/dashboard/Groups";
import Statistics from "@/components/dashboard/Statistics";
import Welcome from "@/components/dashboard/Welcome";

export default function DashboardPage() {
  return (
    <div>
      <Welcome />
      <DataCards />
      <Statistics />
      <Groups />
    </div>
  );
}
