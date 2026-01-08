import { useMutation } from '@tanstack/react-query';

import { apiClient, NOTIFICATION_ENDPOINTS } from '@/api';

export const useReadNotification = () => {
  return useMutation({
    mutationKey: ['read-notification'],
    mutationFn: async (notificationId: string) => {
      const response = await apiClient.post(
        `${NOTIFICATION_ENDPOINTS.READ_NOTIFICATION}/${notificationId}/read`,
      );

      return response.data;
    },
  });
};
