import PageHeader from "@/components/common/PageHeader";
import BillingTable from "@/components/billing/table/index";

export default function BillingPage() {
  return (
    <div>
      <PageHeader
        title="Billing"
        description="View your transaction history and fund your wallet."
        className="mb-6"
      />
      <BillingTable />
    </div>
  );
}
