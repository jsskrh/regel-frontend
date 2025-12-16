
import PageHeader from "@/components/common/PageHeader";
import GroupForm from "@/components/groups/GroupForm";

export default function AddGroupPage() {
  return (
    <div>
      <PageHeader
        title="Add new group"
        description="Create a new contact group"
        className="mb-6"
      />
      <GroupForm />
    </div>
  );
}
