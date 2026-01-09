import {
  API_BASE_URL,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID,
  ONESIGNAL_APP_ID,
  STRIPE_PUBLISHABLE_KEY,
} from '@env';

export const Config = {
  // API Configuration
  API_BASE_URL: API_BASE_URL || 'https://api.yourdomain.com',

  // Social Auth Configuration
  GOOGLE_WEB_CLIENT_ID: GOOGLE_WEB_CLIENT_ID || '',
  GOOGLE_IOS_CLIENT_ID: GOOGLE_IOS_CLIENT_ID || '',

  // Push Notifications
  ONESIGNAL_APP_ID: ONESIGNAL_APP_ID || '',

  // Stripe Configuration
  STRIPE_PUBLISHABLE_KEY: STRIPE_PUBLISHABLE_KEY || '',
} as const;

export default Config;
