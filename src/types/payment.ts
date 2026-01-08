/**
 * Payment Types
 * Types for Stripe payment integration
 */

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

export type PaymentStatus = 'idle' | 'loading' | 'success' | 'error';

export interface PaymentState {
  status: PaymentStatus;
  error: string | null;
  isPaymentSheetReady: boolean;
}
