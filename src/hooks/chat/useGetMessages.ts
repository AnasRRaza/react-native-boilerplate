import { useInfiniteQuery } from '@tanstack/react-query';

import { getMockMessages } from '@/constants/mockdata';
import { Message } from '@/types/chat';

interface MessagesResponse {
  messages: Message[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalMessages: number;
    messagesPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * Custom hook to fetch messages for a conversation with infinite scroll
 * Currently uses mock data - replace with actual API call when ready
 */
export const useGetMessages = (otherUserId: string) => {
  return useInfiniteQuery({
    queryKey: ['messages', otherUserId],
    queryFn: async ({ pageParam }): Promise<MessagesResponse> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Use roomId based on the user - in mock, we use a simple mapping
      const roomId = `room${otherUserId.replace('user', '')}`;
      const result = getMockMessages(roomId, pageParam, 20);

      return result;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.pagination.hasNextPage) {
        return lastPage.pagination.currentPage + 1;
      }

      return undefined;
    },
    enabled: !!otherUserId,
  });
};
