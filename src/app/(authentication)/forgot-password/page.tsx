import { ForgotPasswordForm } from "@/components/authentication/forgot-password/form";
import { KassaCard } from "@/components/kassa-card";

export default function Verification() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
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
