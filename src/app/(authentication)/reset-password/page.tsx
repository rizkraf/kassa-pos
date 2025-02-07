import { ResetPasswordForm } from "@/components/authentication/reset-password/form";
import { KassaCard } from "@/components/kassa-card";

export default function ResetPassword() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <KassaCard
        title="Create a new password"
        description="Enter your new password."
        imageLogo="/logo-card.png"
      >
        <ResetPasswordForm />
      </KassaCard>
    </main>
  );
}
