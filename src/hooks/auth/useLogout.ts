import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { apiClient, USER_ENDPOINTS } from '@/api';
import { ApiResponse } from '@/models';
import { useAuthStore } from '@/store/authStore';
import {
  disableOneSignalSubscription,
  OneSignalSubscription,
} from '@/utils/onesignal';

interface UseLogoutReturn {
  handleLogout: () => Promise<void>;
  isLoggingOut: boolean;
}

interface UpdateSubscriptionsPayload {
  oneSignalSubscriptions: OneSignalSubscription[];
}

const updateSubscriptionsOnBackend = async (
  data: UpdateSubscriptionsPayload,
): Promise<void> => {
  await apiClient.post<ApiResponse<null>>(USER_ENDPOINTS.UPDATE_PROFILE, data);
};

export const useLogout = (): UseLogoutReturn => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const queryClient = useQueryClient();
  const { logout, user } = useAuthStore();

  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);

    try {
      const subscriptions = user?.oneSignalSubscriptions ?? [];

      await disableOneSignalSubscription(
        updateSubscriptionsOnBackend,
        subscriptions,
      );
    } catch (error) {
      console.error(
        'Error disabling OneSignal subscription during logout:',
        error,
      );
    } finally {
      queryClient.clear();
      logout();
      setIsLoggingOut(false);
    }
  }, [logout, queryClient, user?.oneSignalSubscriptions]);

  return {
    handleLogout,
    isLoggingOut,
  };
};
