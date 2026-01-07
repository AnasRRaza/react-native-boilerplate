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
