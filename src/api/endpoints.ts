/**
 * API Endpoints Configuration
 * Based on Human Nature App API Structure
 */

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  GOOGLE_SIGNIN: '/auth/google/callback',
  APPLE_SIGNIN: '/auth/apple/callback',
  GUEST_SIGNUP: '/auth/signup-guest',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VERIFY_SIGNUP_OTP: '/auth/verify-signup-otp',
  VERIFY_FORGOT_PASSWORD_OTP: '/auth/verify-forgot-password-otp',
  RESET_PASSWORD: '/auth/verify-reset-password',
  RESEND_SIGNUP_OTP: '/auth/resend-signup-otp',
  RESEND_FORGOT_PASSWORD_OTP: '/auth/resend-forgot-password-otp',
  REFRESH_TOKEN: '/auth/refresh-token',
} as const;

export const USER_ENDPOINTS = {
  GET_PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/update-profile',
  DELETE_ACCOUNT: '/users/delete-account',
  UPLOAD_MEDIA: '/media/upload',
  RESPOND_FRIEND_REQUEST: '/users/respond-friend-request',
} as const;

export const NOTIFICATION_ENDPOINTS = {
  NOTIFICATIONS: '/notifications',
  READ_NOTIFICATION: '/notifications',
  READ_NOTIFICATIONS: '/notifications/mark-all-read',
  NOTIFICATIONS_UNREAD: '/notifications/unread-count',
  NOTIFICATION_STREAM: '/notifications/stream',
} as const;

export const ENDPOINTS = {
  ...AUTH_ENDPOINTS,
  ...USER_ENDPOINTS,
  ...NOTIFICATION_ENDPOINTS,
} as const;

export default ENDPOINTS;
