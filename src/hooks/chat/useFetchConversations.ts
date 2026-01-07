import { useInfiniteQuery } from '@tanstack/react-query';

import { getMockConversations } from '@/constants/mockdata';
import { useAuthStore } from '@/store/authStore';

/**
 * Custom hook to fetch conversations with infinite scroll pagination
 * Currently uses mock data - replace with actual API call when ready
 */
export const useFetchConversations = (limit: number = 20) => {
  const user = useAuthStore(state => state.user);
  const currentUserId = user?._id ?? 'currentUser';

  return useInfiniteQuery({
    queryKey: ['conversations', limit],
    queryFn: async ({ pageParam = 1 }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const result = getMockConversations(pageParam, limit);

      return {
        conversations: result.conversations,
        pagination: result.pagination,
        currentUserId,
      };
    },
    getNextPageParam: lastPage => {
      if (lastPage.pagination.hasNextPage) {
        return lastPage.pagination.page + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
    staleTime: 1 * 60 * 1000,
    enabled: !!currentUserId,
  });
};
