import { Metadata } from "next";
import { PricingSection } from "@/components/pricing/PricingSection";

export const metadata: Metadata = {
  title: "Tarifs StageFlow AI - Trouvez le plan parfait",
  description: "Découvrez nos offres pour booster votre recherche de stage. Du plan gratuit pour commencer au plan illimité pour une recherche intensive.",
};

// In a real server component, we would fetch the user's current plan here.
// For now, we'll let the client side handle the current plan state or pass a default.
// If we had authentication/session utilities available here, we'd use them.

export default async function PricingPage() {
  // Mock fetching current plan or get from session
  // const user = await getCurrentUser();
  // const currentPlan = user?.plan?.id;
  
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PricingSection />
    </main>
  );
}
