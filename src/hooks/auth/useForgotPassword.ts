import { useMutation } from '@tanstack/react-query';

import { apiClient, AUTH_ENDPOINTS } from '@/api';
import { ApiResponse, ForgotPasswordPayload } from '@/models';

/**
 * Forgot Password Hook
 * Sends OTP to user's email
 * @returns mutation hook for forgot password
 */
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (payload: ForgotPasswordPayload) => {
      const response = await apiClient.post<ApiResponse>(
        AUTH_ENDPOINTS.FORGOT_PASSWORD,
        payload,
      );

      return response.data;
    },
  });
};
