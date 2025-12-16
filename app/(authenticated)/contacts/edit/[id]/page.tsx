import PageHeader from "@/components/common/PageHeader";
import ContactForm from "@/components/contacts/ContactForm";

export default async function EditContact({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <PageHeader
        title="Edit contact"
        description="Update contact information"
        className="mb-6"
      />
      <ContactForm contactId={id} />
    </div>
  );
}
