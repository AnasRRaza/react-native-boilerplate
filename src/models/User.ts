import { Country, Interest, Language } from '@/types/common';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export enum PrivacyMode {
  PUBLIC = 'Public',
  PRIVATE = 'Private',
}

export interface ProfilePicture {
  filename: string;
  path: string;
}

export interface User {
  _id: string;
  role: Role;
  interests: Interest[];
  provider: string;
  isOnboarded: boolean;
  isActive: boolean;
  isDeleted: boolean;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  country: Country;
  fullName: string;
  preferredLanguage: Language;
  privacyMode: PrivacyMode;
  profilePicture: {
    filename: string;
    path: string;
  };
  nameAlias?: string;
  age: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}
