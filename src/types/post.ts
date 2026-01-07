export interface PostMedia {
  type: 'image' | 'video';
  uri: string;
  thumbnail?: string;
}

export interface PostUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

export interface BusinessTag {
  _id: string;
  name: string;
  city: string;
  country: string;
  coverImageUrl: string | null;
  logoImageUrl: string | null;
  address?: string;
  latitude?: number;
  longitude?: number;
}

export interface Post {
  id: string;
  user: PostUser;
  media: PostMedia[];
  description: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  tags?: string[];
  location?: string;
  businessTag?: BusinessTag;
  timestamp: Date | string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PostsResponse {
  posts: Post[];
  pagination: PaginationInfo;
}

export interface TogglePostLikePayload {
  postId: string;
}

export interface TogglePostLikeResponse {
  postId: string;
  userId: string;
  isLiked: boolean;
}
