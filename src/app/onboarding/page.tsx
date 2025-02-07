
import { KassaCard } from "@/components/kassa-card";
import { OnboardingForm } from "@/components/onboarding/form";

export default function Onboarding() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <KassaCard
        title="Create a new store"
        description="Your journey starts here! "
        imageLogo="/logo-card.png"
      >
        <OnboardingForm />
      </KassaCard>
    </main>
  );
}
