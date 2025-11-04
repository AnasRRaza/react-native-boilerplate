import { useMutation } from '@tanstack/react-query';

import { apiClient, AUTH_ENDPOINTS } from '@/api';
import { ApiResponse, GoogleSignInPayload, User } from '@/models';

/**
 * Google Sign-In Hook
 * Authenticates user with Google OAuth token
 * @returns mutation hook for Google sign-in
 */
export const useGoogleSignIn = () => {
  return useMutation({
    mutationFn: async (payload: GoogleSignInPayload) => {
      const response = await apiClient.post<
        ApiResponse<User & { token: string }>
      >(AUTH_ENDPOINTS.GOOGLE_SIGNIN, payload);

      return response.data;
    },
  });
};
