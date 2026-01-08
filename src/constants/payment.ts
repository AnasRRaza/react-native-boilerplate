import { PaymentType, SubscriptionPlan } from '@/types/payment';

export const PAYMENT_TYPES: { id: PaymentType; label: string }[] = [
  { id: 'one-time', label: 'One-time' },
  { id: 'subscription', label: 'Subscribe' },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 14.99,
    interval: 'month',
    description: 'Billed monthly, cancel anytime',
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 149,
    interval: 'year',
    description: 'Save 17% with annual billing',
  },
];

export const DEFAULT_CURRENCY = 'usd';
export const MIN_PAYMENT_AMOUNT = 1;
export const MAX_PAYMENT_AMOUNT = 10000;
