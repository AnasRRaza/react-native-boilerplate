import { useMutation } from '@tanstack/react-query';

import { apiClient, NOTIFICATION_ENDPOINTS } from '@/api';

export const useDeleteNotification = () => {
  return useMutation({
    mutationKey: ['delete-notification'],
    mutationFn: async (notificationId: string) => {
      const response = await apiClient.delete(
        `${NOTIFICATION_ENDPOINTS.NOTIFICATIONS}/${notificationId}`,
      );

      return response.data;
    },
  });
};
