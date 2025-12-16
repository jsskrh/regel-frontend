import PageHeader from "@/components/common/PageHeader";
import ContactForm from "@/components/contacts/ContactForm";

export default function AddContact() {
  return (
    <div>
      <PageHeader
        title="Add new contacts"
        description="Register new contacts to your list"
        className="mb-6"
      />
      <ContactForm />
    </div>
  );
}