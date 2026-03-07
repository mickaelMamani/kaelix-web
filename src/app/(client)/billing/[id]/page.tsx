export const metadata = {
  title: "Détail Facture",
};

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-2xl font-bold">Facture #{id}</h1>
    </div>
  );
}
