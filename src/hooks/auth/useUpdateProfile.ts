import { useMutation } from '@tanstack/react-query';

import { apiClient, USER_ENDPOINTS } from '@/api';
import { ApiResponse, TUpdateProfilePayload, User } from '@/models';

/**
 * Update Profile Hook
 * Updates user profile information (used in onboarding)
 * @returns mutation hook for updating profile
 */
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (
      payload: TUpdateProfilePayload,
    ): Promise<ApiResponse<User>> => {
      const response = await apiClient.post(
        USER_ENDPOINTS.UPDATE_PROFILE,
        payload,
      );

      return response.data;
    },
  });
};
