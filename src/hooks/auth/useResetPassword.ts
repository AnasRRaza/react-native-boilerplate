import { useMutation } from '@tanstack/react-query';

import { apiClient, AUTH_ENDPOINTS } from '@/api';
import { ResetPasswordPayload } from '@/models';

/**
 * Reset Password Hook
 * Resets user password using token from OTP verification
 * @returns mutation hook for reset password
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (payload: ResetPasswordPayload) => {
      const response = await apiClient.post(
        AUTH_ENDPOINTS.RESET_PASSWORD,
        payload,
      );

      return response.data;
    },
  });
};
