import TransfersForm from "@/app/dashboard/transfers/transfers-form";

export default async function TransfersPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <TransfersForm />
    </div>
  );
}
