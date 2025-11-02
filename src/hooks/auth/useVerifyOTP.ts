import { useMutation } from '@tanstack/react-query';

import { apiClient, AUTH_ENDPOINTS } from '@/api';
import {
  ApiResponse,
  AuthResponse,
  OTPVerificationResponse,
  VerifyOTPPayload,
} from '@/models';

/**
 * Verify OTP Hook
 * Handles both signup and forgot password OTP verification
 * @returns mutation hook for OTP verification
 */
export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: async (payload: VerifyOTPPayload) => {
      const endpoint =
        payload.otpType === 'signup'
          ? AUTH_ENDPOINTS.VERIFY_SIGNUP_OTP
          : AUTH_ENDPOINTS.VERIFY_FORGOT_PASSWORD_OTP;

      const response = await apiClient.post<
        ApiResponse<OTPVerificationResponse | AuthResponse>
      >(endpoint, {
        email: payload.email,
        otp: payload.otp,
      });

      return response.data;
    },
  });
};
