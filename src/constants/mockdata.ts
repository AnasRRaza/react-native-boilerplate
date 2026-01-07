import { Conversation, Message } from '@/types/chat';
import { PaginationInfo, Post } from '@/types/post';

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Sarah Johnson',
      username: 'sarahj',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    media: [
      {
        type: 'image',
        uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      },
    ],
    description:
      'Beautiful sunset at the mountains! Nature never fails to amaze me. 🌄 #nature #sunset #mountains',
    viewsCount: 1250,
    likesCount: 342,
    commentsCount: 28,
    isLiked: false,
    tags: ['nature', 'sunset', 'mountains'],
    location: 'Rocky Mountains, Colorado',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Mike Chen',
      username: 'mikechen',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    media: [
      {
        type: 'image',
        uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      },
      {
        type: 'image',
        uri: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800',
      },
    ],
    description:
      'Homemade pasta dinner tonight! Nothing beats fresh ingredients. 🍝 #foodie #homecooking',
    viewsCount: 890,
    likesCount: 156,
    commentsCount: 12,
    isLiked: true,
    tags: ['foodie', 'homecooking'],
    location: 'San Francisco, CA',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Emma Wilson',
      username: 'emmaw',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    media: [
      {
        type: 'image',
        uri: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
      },
    ],
    description:
      'Working on some exciting new projects! Stay tuned for updates. 💻 #tech #coding #startup',
    viewsCount: 2100,
    likesCount: 478,
    commentsCount: 45,
    isLiked: false,
    tags: ['tech', 'coding', 'startup'],
    location: 'Austin, TX',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    user: {
      id: 'user4',
      name: 'Alex Rivera',
      username: 'alexr',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    media: [
      {
        type: 'image',
        uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
      },
    ],
    description:
      'Morning workout complete! 💪 Consistency is key. #fitness #motivation #gym',
    viewsCount: 567,
    likesCount: 98,
    commentsCount: 8,
    isLiked: false,
    tags: ['fitness', 'motivation', 'gym'],
    location: 'Los Angeles, CA',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    user: {
      id: 'user5',
      name: 'Lisa Park',
      username: 'lisap',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    media: [
      {
        type: 'image',
        uri: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
      },
      {
        type: 'image',
        uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
      },
      {
        type: 'image',
        uri: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800',
      },
    ],
    description:
      'Road trip adventures! These views are absolutely breathtaking. 🚗🏔️ #travel #roadtrip #adventure',
    viewsCount: 3200,
    likesCount: 892,
    commentsCount: 67,
    isLiked: true,
    tags: ['travel', 'roadtrip', 'adventure'],
    location: 'Pacific Coast Highway',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    user: {
      id: 'user6',
      name: 'James Taylor',
      username: 'jamest',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    },
    media: [
      {
        type: 'image',
        uri: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
      },
    ],
    description:
      'New music dropping soon! Been working on this one for months. 🎵 #music #newmusic #producer',
    viewsCount: 1890,
    likesCount: 445,
    commentsCount: 89,
    isLiked: false,
    tags: ['music', 'newmusic', 'producer'],
    location: 'Nashville, TN',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const generateMockPagination = (
  page: number,
  limit: number,
  totalItems: number,
): PaginationInfo => {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    currentPage: page,
    totalPages,
    totalItems,
    itemsPerPage: limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

export const getMockPosts = (
  page: number = 1,
  limit: number = 10,
): { posts: Post[]; pagination: PaginationInfo } => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = MOCK_POSTS.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    pagination: generateMockPagination(page, limit, MOCK_POSTS.length),
  };
};

// Chat Mock Data
export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    roomId: 'room1',
    lastMessage: {
      _id: 'msg1',
      roomId: { _id: 'room1', participants: ['currentUser', 'user1'] },
      senderId: 'user1',
      receiverId: 'currentUser',
      message: 'Hey! How are you doing?',
      media: null,
      messageType: 'text',
      isRead: false,
      isDeleted: false,
      isEdited: false,
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    otherParticipant: {
      _id: 'user1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    roomId: 'room2',
    lastMessage: {
      _id: 'msg2',
      roomId: { _id: 'room2', participants: ['currentUser', 'user2'] },
      senderId: 'currentUser',
      receiverId: 'user2',
      message: 'Sure, let me check and get back to you.',
      media: null,
      messageType: 'text',
      isRead: true,
      isDeleted: false,
      isEdited: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    otherParticipant: {
      _id: 'user2',
      name: 'Mike Chen',
      email: 'mike@example.com',
      profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    roomId: 'room3',
    lastMessage: {
      _id: 'msg3',
      roomId: { _id: 'room3', participants: ['currentUser', 'user3'] },
      senderId: 'user3',
      receiverId: 'currentUser',
      message: 'The meeting is scheduled for tomorrow at 3 PM.',
      media: null,
      messageType: 'text',
      isRead: false,
      isDeleted: false,
      isEdited: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    otherParticipant: {
      _id: 'user3',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    roomId: 'room4',
    lastMessage: {
      _id: 'msg4',
      roomId: { _id: 'room4', participants: ['currentUser', 'user4'] },
      senderId: 'user4',
      receiverId: 'currentUser',
      message: 'Thanks for your help!',
      media: null,
      messageType: 'text',
      isRead: true,
      isDeleted: false,
      isEdited: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    otherParticipant: {
      _id: 'user4',
      name: 'Alex Rivera',
      email: 'alex@example.com',
      profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    roomId: 'room5',
    lastMessage: {
      _id: 'msg5',
      roomId: { _id: 'room5', participants: ['currentUser', 'user5'] },
      senderId: 'currentUser',
      receiverId: 'user5',
      message: 'Looking forward to seeing you!',
      media: null,
      messageType: 'text',
      isRead: true,
      isDeleted: false,
      isEdited: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    otherParticipant: {
      _id: 'user5',
      name: 'Lisa Park',
      email: 'lisa@example.com',
      profileImage: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  room1: [
    {
      _id: 'msg1-1',
      roomId: 'room1',
      senderId: 'user1',
      receiverId: 'currentUser',
      message: 'Hey! How are you doing?',
      media: null,
      messageType: 'text',
      isRead: true,
      isDeleted: false,
      isEdited: false,
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    {
      _id: 'msg1-2',
      roomId: 'room1',
      senderId: 'currentUser',
      receiverId: 'user1',
      // eslint-disable-next-line quotes
      message: "I'm doing great, thanks for asking! How about you?",
      media: null,
      messageType: 'text',
      isRead: true,
      isDeleted: false,
      isEdited: false,
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    },
    {
      _id: 'msg1-3',
      roomId: 'room1',
      senderId: 'user1',
      receiverId: 'currentUser',
      message: 'Pretty good! Just finished a project.',
      media: null,
      messageType: 'text',
      isRead: true,
      isDeleted: false,
      isEdited: false,
      createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
  ],
  room2: [
    {
      _id: 'msg2-1',
      roomId: 'room2',
      senderId: 'currentUser',
      receiverId: 'user2',
      message: 'Sure, let me check and get back to you.',
      media: null,
      messageType: 'text',
      isRead: true,
      isDeleted: false,
      isEdited: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      _id: 'msg2-2',
      roomId: 'room2',
      senderId: 'user2',
      receiverId: 'currentUser',
      message: 'Can you help me with the new feature?',
      media: null,
      messageType: 'text',
      isRead: true,
      isDeleted: false,
      isEdited: false,
      createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    },
  ],
};

export const getMockConversations = (
  page: number = 1,
  limit: number = 20,
): {
  conversations: Conversation[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
} => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedConversations = MOCK_CONVERSATIONS.slice(startIndex, endIndex);
  const totalPages = Math.ceil(MOCK_CONVERSATIONS.length / limit);

  return {
    conversations: paginatedConversations,
    pagination: {
      page,
      limit,
      total: MOCK_CONVERSATIONS.length,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

export const getMockMessages = (
  roomId: string,
  page: number = 1,
  limit: number = 20,
): {
  messages: Message[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalMessages: number;
    messagesPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
} => {
  const messages = MOCK_MESSAGES[roomId] || [];
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedMessages = messages.slice(startIndex, endIndex);
  const totalPages = Math.ceil(messages.length / limit);

  return {
    messages: paginatedMessages,
    pagination: {
      currentPage: page,
      totalPages,
      totalMessages: messages.length,
      messagesPerPage: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};
