import { useMutation } from '@tanstack/react-query';

import { apiClient, AUTH_ENDPOINTS } from '@/api';
import { ApiResponse, SignupPayload } from '@/models';

/**
 * Signup Hook
 * @returns mutation hook for signup
 */
export const useSignup = () => {
  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      const response = await apiClient.post<ApiResponse>(
        AUTH_ENDPOINTS.SIGNUP,
        payload,
      );

      return response.data;
    },
  });
};
