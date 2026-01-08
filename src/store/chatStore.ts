import { create } from 'zustand';

import { ChatMessage, MessageType } from '@/types/chat';

interface PendingMessage {
  id: string;
  receiverId: string;
  message: string;
  messageType: MessageType;
  timestamp: string;
  retries: number;
}

interface ChatState {
  activeConversationId: string | null;
  activeOtherUserId: string | null;
  typingUsers: Record<string, boolean>;
  pendingMessages: PendingMessage[];
  realtimeMessages: Record<string, ChatMessage[]>;
  isConnected: boolean;
  setActiveConversation: (
    conversationId: string | null,
    otherUserId: string | null,
  ) => void;
  updateActiveConversationId: (conversationId: string) => void;
  setTyping: (userId: string, isTyping: boolean) => void;
  clearTyping: (userId: string) => void;
  addPendingMessage: (msg: PendingMessage) => void;
  removePendingMessage: (id: string) => void;
  removePendingMessageByContent: (content: string, receiverId: string) => void;
  addRealtimeMessage: (conversationId: string, message: ChatMessage) => void;
  clearRealtimeMessages: (conversationId: string) => void;
  setConnectionStatus: (isConnected: boolean) => void;
  reset: () => void;
}

const initialState = {
  activeConversationId: null,
  activeOtherUserId: null,
  typingUsers: {},
  pendingMessages: [],
  realtimeMessages: {},
  isConnected: false,
};

export const useChatStore = create<ChatState>()(set => ({
  ...initialState,

  setActiveConversation: (conversationId, otherUserId) =>
    set({
      activeConversationId: conversationId,
      activeOtherUserId: otherUserId,
    }),

  updateActiveConversationId: conversationId =>
    set({ activeConversationId: conversationId }),

  setTyping: (userId, isTyping) =>
    set(state => ({
      typingUsers: {
        ...state.typingUsers,
        [userId]: isTyping,
      },
    })),

  clearTyping: userId =>
    set(state => {
      const rest = { ...state.typingUsers };
      delete rest[userId];

      return { typingUsers: rest };
    }),

  addPendingMessage: msg =>
    set(state => ({
      pendingMessages: [...state.pendingMessages, msg],
    })),

  removePendingMessage: id =>
    set(state => ({
      pendingMessages: state.pendingMessages.filter(m => m.id !== id),
    })),

  removePendingMessageByContent: (content, receiverId) =>
    set(state => {
      const index = state.pendingMessages.findIndex(
        m =>
          m.receiverId === receiverId &&
          (m.message === content ||
            m.message.endsWith(content) ||
            content.endsWith(m.message)),
      );
      if (index === -1) {
        return state;
      }
      const newPendingMessages = [...state.pendingMessages];
      newPendingMessages.splice(index, 1);

      return { pendingMessages: newPendingMessages };
    }),

  addRealtimeMessage: (conversationId, message) =>
    set(state => ({
      realtimeMessages: {
        ...state.realtimeMessages,
        [conversationId]: [
          ...(state.realtimeMessages[conversationId] ?? []),
          message,
        ],
      },
    })),

  clearRealtimeMessages: conversationId =>
    set(state => {
      const rest = { ...state.realtimeMessages };
      delete rest[conversationId];

      return { realtimeMessages: rest };
    }),

  setConnectionStatus: isConnected => set({ isConnected }),

  reset: () => set(initialState),
}));
