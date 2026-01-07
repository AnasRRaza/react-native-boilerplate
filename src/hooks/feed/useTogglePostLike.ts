import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TogglePostLikePayload, TogglePostLikeResponse } from '@/types/post';

// TODO: Replace with actual API call when backend is ready
// import { apiClient, FEED_ENDPOINTS } from '@/api';

export const useTogglePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: TogglePostLikePayload,
    ): Promise<TogglePostLikeResponse> => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // TODO: Replace with actual API call
      // const response = await apiClient.post(FEED_ENDPOINTS.POST_LIKE, payload);
      // return response.data;

      // Mock response for now
      return {
        postId: payload.postId,
        userId: 'current-user-id',
        isLiked: true,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
  });
};
