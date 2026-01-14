import { PricingPlan } from '@/types/pricing';

export const PRICING_PLANS: PricingPlan[] = [
  // --- DÉCOUVERTE ---
  {
    id: 'free',
    name: 'Free',
    description: 'Pour découvrir',
    price: {
      monthly: 0,
      annual: 0,
    },
    gradient: { from: 'from-gray-100', to: 'to-gray-200' },
    cta: {
      text: 'Commencer',
      variant: 'outline',
    },
    features: [
      { text: 'Onboarding 10 étapes', included: true },
      { text: 'Profil BASIQUE généré', included: true },
      { text: '3 entreprises matchées (aperçu)', included: true },
      { text: '1 lettre DEMO (visible, non exportable)', included: true },
      { text: 'Pas d\'export', included: false },
      { text: 'Pas de génération supplémentaire', included: false },
    ],
  },
  {
    id: 'profil_pro',
    name: 'Profil Pro',
    description: 'Juste le profil, à vie',
    price: {
      monthly: 0,
      annual: 0,
      oneTime: 19.99,
    },
    badge: {
      text: 'PAIEMENT UNIQUE',
      color: 'blue'
    },
    gradient: { from: 'from-blue-100', to: 'to-blue-200' },
    cta: {
      text: 'Acheter le profil',
      variant: 'secondary',
    },
    features: [
      { text: 'Onboarding 10 étapes + questions bonus', included: true },
      { text: 'Profil DÉTAILLÉ généré', included: true, highlight: true },
      { text: 'Analyse SWOT', included: true },
      { text: 'Soft skills détectées', included: true },
      { text: 'Recommandations carrière', included: true },
      { text: 'Export PDF pro', included: true },
      { text: 'Format LinkedIn ready', included: true },
      { text: 'Pas de matching entreprises', included: false },
      { text: 'Pas de génération lettres', included: false },
      { text: '💡 Pour : ceux qui veulent juste le profil', included: true, highlight: true },
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'Pour candidater un peu',
    price: {
      monthly: 4.99,
      annual: 4.99,
    },
    gradient: { from: 'from-green-100', to: 'to-green-200' },
    cta: {
      text: 'S\'abonner',
      variant: 'default',
    },
    features: [
      { text: 'Profil BASIQUE', included: true },
      { text: '10 entreprises matchées', included: true },
      { text: '5 lettres / mois', included: true },
      { text: '5 emails / mois', included: true },
      { text: 'Export PDF', included: true },
      { text: 'Pas de dashboard', included: false },
    ],
  },

  // --- EXPERT ---
  {
    id: 'pro',
    name: 'Pro',
    description: 'Le choix recommandé',
    popular: true,
    highlighted: true,
    price: {
      monthly: 9.99,
      annual: 9.99,
    },
    badge: {
      text: 'BEST SELLER',
      color: 'yellow' // Changed to yellow/gold as per previous context or generic best seller color
    },
    gradient: { from: 'from-purple-500', to: 'to-violet-600' },
    cta: {
      text: 'Passer Pro',
      variant: 'default',
    },
    features: [
      { text: 'Profil DÉTAILLÉ (inclus)', included: true, highlight: true },
      { text: 'Entreprises illimitées', included: true },
      { text: '30 lettres / mois', included: true },
      { text: '30 emails / mois', included: true },
      { text: 'Dashboard de suivi', included: true },
      { text: 'Rappels de relance', included: true },
      { text: 'IA Claude 3.5 Sonnet', included: true },
    ],
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    description: 'La puissance totale',
    price: {
      monthly: 19.99,
      annual: 19.99,
    },
    badge: {
      text: 'VIP',
      color: 'red'
    },
    gradient: { from: 'from-black', to: 'to-gray-900' },
    cta: {
      text: 'Devenir Illimité',
      variant: 'secondary',
    },
    features: [
      { text: 'Tout illimité', included: true, highlight: true },
      { text: 'GPT-4o Premium', included: true },
      { text: 'Support prioritaire', included: true },
      { text: 'Early access features', included: true },
    ],
  },
];
