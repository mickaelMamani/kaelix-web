export const metadata = {
  title: "Détail Projet",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-2xl font-bold">Projet #{id}</h1>
    </div>
  );
}
