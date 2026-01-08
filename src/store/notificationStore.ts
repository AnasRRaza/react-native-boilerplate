import EventSource from 'react-native-sse';
import { create } from 'zustand';

import { apiClient, NOTIFICATION_ENDPOINTS } from '@/api';
import Config from '@/config/app.config';
import { GetNotificationsResponse, Notification } from '@/models';

interface NotificationStore {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  unreadCount: number;
  fetchNotifications: (page?: number) => Promise<GetNotificationsResponse>;
  fetchUnreadNotifications: () => Promise<void>;
  startSSE: (userId: string, token: string) => void;
  stopSSE: () => void;
}

let sseInstance: EventSource | null = null;

export const useNotificationStore = create<NotificationStore>(set => ({
  notifications: [],
  unreadCount: 0,
  setNotifications: notifications => set({ notifications }),

  fetchNotifications: async (page = 1) => {
    const response = await apiClient.get(
      `${NOTIFICATION_ENDPOINTS.NOTIFICATIONS}?page=${page}`,
    );

    return response.data.data;
  },

  fetchUnreadNotifications: async () => {
    const response = await apiClient.get(
      NOTIFICATION_ENDPOINTS.NOTIFICATIONS_UNREAD,
    );

    set({ unreadCount: response.data.data });
  },

  startSSE: (userId: string, token: string) => {
    sseInstance = new EventSource(
      `${Config.API_BASE_URL}${NOTIFICATION_ENDPOINTS.NOTIFICATION_STREAM}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!sseInstance) {
      return;
    }

    sseInstance.open();

    sseInstance.addEventListener('open', () => {
      console.warn('SSE connection opened');
    });

    sseInstance.addEventListener('message', event => {
      if (!event.data) {
        return;
      }

      try {
        const data = JSON.parse(event.data) as Notification;
        set(state => ({ notifications: [data, ...state.notifications] }));
        set(state => ({ unreadCount: state.unreadCount + 1 }));
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    });

    sseInstance.addEventListener('error', () => {
      console.warn('SSE connection error');
    });
  },

  stopSSE: () => {
    if (sseInstance) {
      sseInstance.removeEventListener('open', () => {
        console.warn('SSE opened');
      });
      sseInstance.removeEventListener('message', () => {
        console.warn('SSE message removed');
      });
      sseInstance.removeEventListener('error', () => {
        console.warn('SSE error removed');
      });
      sseInstance.removeEventListener('close', () => {
        console.warn('SSE closed');
      });
      sseInstance.close();
    }
  },
}));
