import { useQuery } from '@tanstack/react-query';

import { apiClient, NOTIFICATION_ENDPOINTS } from '@/api';
import { GetNotificationsResponse } from '@/models';

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async (): Promise<GetNotificationsResponse> => {
      const response = await apiClient.get(
        NOTIFICATION_ENDPOINTS.NOTIFICATIONS,
      );

      return response.data.data;
    },
  });
};
