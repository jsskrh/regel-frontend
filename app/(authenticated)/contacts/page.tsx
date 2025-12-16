import PageHeader from "@/components/common/PageHeader";
import ContactsTable from "@/components/contacts/table/index";

export default function Contacts() {
  return (
    <div>
      <PageHeader
        title="Contacts"
        description="Manage your existing contacts"
        className="mb-6"
      />
      <ContactsTable />
    </div>
  );
}
