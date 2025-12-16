
import PageHeader from "@/components/common/PageHeader";
import GroupsTable from "@/components/groups/table/index";

export default function GroupsPage() {
  return (
    <div>
      <PageHeader
        title="Groups"
        description="Manage your contact groups"
        className="mb-6"
      />
      <GroupsTable />
    </div>
  );
}
