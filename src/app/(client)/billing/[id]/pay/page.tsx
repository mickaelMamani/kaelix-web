export const metadata = {
  title: "Paiement",
};

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-2xl font-bold">Paiement — Facture #{id}</h1>
    </div>
  );
}
