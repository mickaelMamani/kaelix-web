export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* TODO: Public navbar */}
      <main className="min-h-screen">{children}</main>
      {/* TODO: Public footer */}
    </>
  );
}
