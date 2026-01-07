import { useInfiniteQuery } from '@tanstack/react-query';

import { getMockPosts } from '@/constants/mockdata';
import { PostsResponse } from '@/types/post';

// TODO: Replace with actual API call when backend is ready
// import { apiClient, FEED_ENDPOINTS } from '@/api';

/**
 * Custom hook to fetch posts with infinite scroll pagination
 * Currently using mock data - replace with API call when ready
 */
export const useFetchPosts = (limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['posts', limit],
    queryFn: async ({ pageParam = 1 }): Promise<PostsResponse> => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // TODO: Replace with actual API call
      // const response = await apiClient.get(`${FEED_ENDPOINTS.POSTS}?page=${pageParam}&limit=${limit}`);
      // return response.data;

      // Using mock data for now
      return getMockPosts(pageParam, limit);
    },
    getNextPageParam: lastPage => {
      if (lastPage.pagination.hasNextPage) {
        return lastPage.pagination.currentPage + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
};
