import { useMutation } from '@tanstack/react-query';

import { apiClient, AUTH_ENDPOINTS } from '@/api';
import { ApiResponse, LoginPayload, User } from '@/models';

/**
 * Login Hook
 * @returns mutation hook for login
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: async (
      payload: LoginPayload,
    ): Promise<ApiResponse<User & { token: string }>> => {
      const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, payload);

      return response.data;
    },
  });
};
