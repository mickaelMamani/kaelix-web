export const metadata = {
  title: "Mot de passe oublié",
};

export default function ForgotPasswordPage() {
  return (
    <div className="rounded-lg bg-white p-8 shadow-lg">
      <h1 className="text-center text-2xl font-bold text-[#0A0A0A]">
        Mot de passe oublié
      </h1>
      <p className="mt-2 text-center text-sm text-gray-500">
        Entrez votre email pour recevoir un lien de réinitialisation
      </p>
    </div>
  );
}
