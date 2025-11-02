import { useMutation } from '@tanstack/react-query';

import { apiClient, AUTH_ENDPOINTS } from '@/api';
import { ApiResponse, ResendOTPPayload } from '@/models';

/**
 * Resend OTP Hook
 * Resends OTP for signup or forgot password
 * @returns mutation hook for resending OTP
 */
export const useResendOTP = () => {
  return useMutation({
    mutationFn: async (payload: ResendOTPPayload) => {
      const endpoint =
        payload.otpType === 'signup'
          ? AUTH_ENDPOINTS.RESEND_SIGNUP_OTP
          : AUTH_ENDPOINTS.RESEND_FORGOT_PASSWORD_OTP;

      const response = await apiClient.post<ApiResponse>(endpoint, {
        email: payload.email,
      });

      return response.data;
    },
  });
};
