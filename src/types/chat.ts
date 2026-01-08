/**
 * Chat Types
 * Based on mobile-app-main chat implementation
 */

export type MessageType = 'text' | 'image' | 'video' | 'audio' | 'file';

export interface ChatUser {
  _id: string;
  name: string;
  profileImage: string | null;
}

export interface ChatRoom {
  _id: string;
  participants: string[];
}

export interface Conversation {
  roomId: string;
  lastMessage: {
    _id: string;
    roomId: ChatRoom;
    senderId: string;
    receiverId: string;
    message: string;
    media: string | null;
    messageType: MessageType;
    isRead: boolean;
    isDeleted: boolean;
    isEdited: boolean;
    createdAt: string;
    updatedAt: string;
  };
  otherParticipant: {
    _id: string;
    name: string;
    email: string;
    profileImage: string | null;
  };
  updatedAt: string;
}

export interface Message {
  _id: string;
  roomId: string | ChatRoom;
  senderId: string | ChatUser;
  receiverId: string | ChatUser;
  message: string;
  media: string | null;
  messageType: MessageType;
  isRead: boolean;
  isDeleted: boolean;
  isEdited: boolean;
  editedAt?: string;
  readAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationsResponse {
  status: number;
  message: string;
  data: {
    conversations: Conversation[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface ChatHistoryResponse {
  status: number;
  message: string;
  data: {
    messages: Message[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface SendMessagePayload {
  senderId: string;
  receiverId: string;
  message: string;
  messageType?: MessageType;
  media?: string;
  roomId?: string;
}

export interface ReceiveMessageData {
  messageId: string;
  roomId: string;
  senderId: string;
  message: string;
  messageType: MessageType;
  media?: string;
  createdAt: string;
  sender?: ChatUser;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName?: string;
  senderAvatar?: string | null;
  type: MessageType;
  content: string;
  timestamp: string;
  isRead: boolean;
  isOwn: boolean;
  isPending?: boolean;
}

export const transformAPIMessage = (
  message: Message,
  currentUserId: string,
): ChatMessage => {
  const senderId =
    typeof message.senderId === 'string'
      ? message.senderId
      : message.senderId._id;

  const senderUser =
    typeof message.senderId === 'object' ? message.senderId : null;

  return {
    id: message._id,
    senderId,
    senderName: senderUser?.name,
    senderAvatar: senderUser?.profileImage,
    type: message.messageType,
    content: message.media ?? message.message,
    timestamp: message.createdAt,
    isRead: message.isRead,
    isOwn: senderId === currentUserId,
  };
};
