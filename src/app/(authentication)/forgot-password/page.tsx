import { ForgotPasswordForm } from "@/components/authentication/forgot-password/form";
import { KassaCard } from "@/components/kassa-card";

export default function ForgotPassword() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <KassaCard
        title="Forgot password"
        description="Enter your email address to reset your password."
        imageLogo="/logo-card.png"
      >
        <ForgotPasswordForm />
      </KassaCard>
    </main>
  );
}
