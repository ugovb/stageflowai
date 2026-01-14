export type PlanTier = 'free' | 'profil_pro' | 'starter' | 'pro' | 'unlimited';

export interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
  tooltip?: string;
}

export interface PricingPlan {
  id: PlanTier;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
    oneTime?: number;
  };
  features: PlanFeature[];
  limitations?: string[];
  cta: {
    text: string;
    variant: 'default' | 'gradient' | 'outline' | 'secondary';
  };
  badge?: {
    text: string;
    color: 'blue' | 'purple' | 'green' | 'orange';
  };
  gradient: {
    from: string;
    to: string;
  };
  popular?: boolean;
  highlighted?: boolean;
}

export interface QuotaStatus {
  plan: PlanTier;
  usage: {
    coverLetters: {
      used: number;
      limit: number | null; // null for unlimited
    };
    profile: {
      depth: 'basic' | 'detailed';
      canExport: boolean;
    };
    aiModel: string;
  };
  renewsAt: string | null;
  isLifetime: boolean;
}

export interface CheckoutSession {
  checkoutUrl: string;
}
