import { ResetPasswordForm } from "@/components/authentication/reset-password/form";
import { KassaCard } from "@/components/kassa-card";

export default function Verification() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
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
