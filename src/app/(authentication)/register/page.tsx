import { RegisterForm } from "@/components/authentication/register/form";
import { KassaCard } from "@/components/kassa-card";

export default function Register() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <KassaCard
        title="Create your own account"
        description="Your journey starts here!"
        imageLogo="/logo-card.png"
      >
        <RegisterForm />
      </KassaCard>
    </main>
  );
}
