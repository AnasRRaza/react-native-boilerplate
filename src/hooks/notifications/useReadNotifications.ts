import { useMutation } from '@tanstack/react-query';

import { apiClient, NOTIFICATION_ENDPOINTS } from '@/api';

export const useReadNotifications = () => {
  return useMutation({
    mutationKey: ['read-notifications'],
    mutationFn: async () => {
      const response = await apiClient.post(
        NOTIFICATION_ENDPOINTS.READ_NOTIFICATIONS,
      );

      return response.data;
    },
  });
};
