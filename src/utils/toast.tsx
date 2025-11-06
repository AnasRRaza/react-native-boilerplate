import { useToast } from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@rneui/themed';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Custom Toast Hook
 * Wrapper around react-native-toast-notifications
 */
export const useToastNotification = () => {
  const toast = useToast();
  const { theme } = useTheme();

  const showToast = (message: string, type: 'success' | 'error') => {
    const icon =
      type === 'success' ? (
        <Icon name="checkmark" size={18} color={theme.colors.success} />
      ) : (
        <Icon name="close" size={18} color={theme.colors.error} />
      );

    toast.show(message, {
      icon,
    });
  };

  return showToast;
};
