import {
  API_BASE_URL,
  APP_NAME,
  APP_VERSION,
  ENABLE_APPLE_SIGNIN,
  ENABLE_GOOGLE_SIGNIN,
  ENABLE_GUEST_MODE,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID,
} from '@env';

// Convert string booleans to actual booleans
const stringToBoolean = (value: string): boolean => {
  return value?.toLowerCase() === 'true';
};

export const Config = {
  // API Configuration
  API_BASE_URL: API_BASE_URL || 'https://api.yourdomain.com',

  // Feature Flags
  ENABLE_GOOGLE_SIGNIN: stringToBoolean(ENABLE_GOOGLE_SIGNIN),
  ENABLE_APPLE_SIGNIN: stringToBoolean(ENABLE_APPLE_SIGNIN),
  ENABLE_GUEST_MODE: stringToBoolean(ENABLE_GUEST_MODE),

  // Social Auth Configuration
  GOOGLE_WEB_CLIENT_ID: GOOGLE_WEB_CLIENT_ID || '',
  GOOGLE_IOS_CLIENT_ID: GOOGLE_IOS_CLIENT_ID || '',

  // App Information
  APP_NAME: APP_NAME || 'KickstartRN',
  APP_VERSION: APP_VERSION || '1.0.0',
} as const;

export default Config;
