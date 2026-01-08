/**
 * Payment Types
 * Types for Stripe payment integration
 */

// One-time Payment Types
export interface PaymentSheetParams {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
  publishableKey: string;
}

export interface PaymentSheetResponse {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
  publishableKey: string;
}

export interface CreatePaymentIntentPayload {
  amount: number;
  currency?: string;
}

// Subscription Types
export type PlanInterval = 'monthly' | 'yearly';

export interface SetupIntentResponse {
  setupIntent: string;
  ephemeralKey: string;
  customer: string;
  publishableKey: string;
}

export interface CreateSetupIntentPayload {
  planInterval?: PlanInterval;
}

export interface CreateSubscriptionPayload {
  planInterval: PlanInterval;
  paymentMethodId?: string;
}

export interface SubscriptionResponse {
  subscriptionId: string;
  status: string;
  planType: string;
  currentPeriodEnd: string | null;
}

export interface SubscriptionPlan {
  id: PlanInterval;
  name: string;
  price: number;
  interval: string;
  description: string;
}

// Common Types
export type PaymentType = 'one-time' | 'subscription';

export type PaymentStatus = 'idle' | 'loading' | 'success' | 'error';

export interface PaymentState {
  status: PaymentStatus;
  error: string | null;
  isPaymentSheetReady: boolean;
}

export interface SubscriptionState {
  status: PaymentStatus;
  error: string | null;
  isSetupReady: boolean;
  paymentMethodId: string | null;
}
