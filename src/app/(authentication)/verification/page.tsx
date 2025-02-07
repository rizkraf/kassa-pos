import { VerificationForm } from "@/components/authentication/verification/form";
import { KassaCard } from "@/components/kassa-card";

export default function Verification() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <KassaCard
        title="Email verification"
        description="Enter verification code exactly as it appears in the email. "
        imageLogo="/logo-card.png"
      >
        <VerificationForm />
      </KassaCard>
    </main>
  );
}
