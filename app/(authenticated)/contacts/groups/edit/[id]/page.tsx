import PageHeader from "@/components/common/PageHeader";
import GroupForm from "@/components/groups/GroupForm";

export default async function EditGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <PageHeader
        title="Edit group"
        description="Update group information"
        className="mb-6"
      />
      <GroupForm groupId={id} />
    </div>
  );
}
