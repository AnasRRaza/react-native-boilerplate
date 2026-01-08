export enum NotificationCategory {
  NEW_PRODUCT = 'new_product',
  NEW_PRODUCT_CATEGORY = 'new_product_category',
  FRIEND_REQUEST = 'friend_request',
  RESPONSE_LIKE = 'response_like',
  RESPONSE_UNLIKE = 'response_unlike',
  NEW_RESPONSE = 'new_response',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  CHAT_MESSAGE = 'chat_message',
}

export interface NotificationProfilePicture {
  path?: string;
  url?: string;
  filename: string;
}

export interface NotificationMetadata {
  profilePicture: NotificationProfilePicture;
  senderId?: string;
  senderName?: string;
  friendRequestId?: string;
  requesterId?: string;
  requesterName?: string;
  responseId?: string;
  questionId?: string;
  questionTitle?: string;
  fullName?: string;
}

export interface Notification {
  id?: string;
  _id?: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  category: NotificationCategory;
  priority: string;
  metadata: NotificationMetadata;
  createdAt: string;
}

export interface GetNotificationsResponse {
  notifications: Notification[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
