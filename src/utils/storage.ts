import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage Keys
 */
export enum STORAGE_KEYS {
  AUTH_TOKEN = '@auth_token',
  USER_DATA = '@user_data',
  ONBOARDING_COMPLETE = '@onboarding_complete',
  THEME_PREFERENCE = '@theme_preference',
}

/**
 * Set item to AsyncStorage
 */
export const setItemToAS = async (
  key: STORAGE_KEYS | string,
  value: unknown,
): Promise<void> => {
  try {
    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.error(`Error saving ${key} to AsyncStorage:`, error);
    throw error;
  }
};

/**
 * Get item from AsyncStorage
 */
export const getItemFromAS = async <T = unknown>(
  key: STORAGE_KEYS | string,
): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      // If parsing fails, return as string
      return value as unknown as T;
    }
  } catch (error) {
    console.error(`Error getting ${key} from AsyncStorage:`, error);

    return null;
  }
};

/**
 * Remove item from AsyncStorage
 */
export const removeItemFromAS = async (
  key: STORAGE_KEYS | string,
): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from AsyncStorage:`, error);
    throw error;
  }
};

/**
 * Clear all AsyncStorage
 */
export const clearAS = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
    throw error;
  }
};

/**
 * Get multiple items from AsyncStorage
 */
export const getMultipleItems = async (
  keys: (STORAGE_KEYS | string)[],
): Promise<Record<string, unknown>> => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    const result: Record<string, unknown> = {};

    values.forEach(([key, value]) => {
      if (value !== null) {
        try {
          result[key] = JSON.parse(value);
        } catch {
          result[key] = value;
        }
      }
    });

    return result;
  } catch (error) {
    console.error('Error getting multiple items from AsyncStorage:', error);

    return {};
  }
};
