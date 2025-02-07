import { LoginForm } from "@/components/authentication/login/form";
import { KassaCard } from "@/components/kassa-card";

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <KassaCard
        title="Log in to your world of possibility"
        description="Your journey starts here!"
        imageLogo="/logo-card.png"
      >
        <LoginForm />
      </KassaCard>
    </main>
  );
}
