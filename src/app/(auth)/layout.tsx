export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0A0A0A] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0A0A0A] to-[#0A0A0A] px-4 py-12">
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
