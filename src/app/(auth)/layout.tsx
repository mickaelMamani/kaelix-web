export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0A0A0A]">
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
