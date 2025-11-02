/**
 * Generic API Response Structure
 */
export interface ApiResponse<T = unknown> {
  status: boolean | number;
  message: string;
  data: T | null;
}

/**
 * API Error Response
 */
export interface ApiError {
  status: boolean | number;
  message: string;
  error?: unknown;
}

/**
 * Authentication Payloads
 */
export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyOTPPayload {
  email: string;
  otp: string;
  otpType: 'signup' | 'forgot-password';
}

export interface ResendOTPPayload {
  email: string;
  otpType: 'signup' | 'forgot-password';
}

export interface ResetPasswordPayload {
  email: string;
  token: string;
  password: string;
}

export interface GoogleSignInPayload {
  token: string;
  isAndroid: boolean;
}

export interface TUpdateProfilePayload
  extends Partial<{
    fullName: string;
    age: number;
    country: string;
    preferredLanguage: string;
    interests: string[];
    privacyMode: string;
    profilePicture: string;
    promptSettings: string;
  }> {}

/**
 * OTP Verification Response
 */
export interface OTPVerificationResponse {
  token?: string;
  message: string;
}

/**
 * Mutation Error Interface
 * Used for handling errors in React Query mutations
 */
export interface MutationError {
  message: string;
  status?: number;
  data?: unknown;
  isNetworkError?: boolean;
  shouldLogout?: boolean;
}
