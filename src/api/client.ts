import NetInfo from '@react-native-community/netinfo';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import Config from '../config/app.config';

import { AUTH_ENDPOINTS } from './endpoints';

/**
 * Check network connectivity
 */
const checkConnectivity = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();

  return state.isConnected ?? false;
};

/**
 * Create Axios Instance
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Token storage (will be set by auth store)
 */
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

/**
 * Request Interceptor
 * - Checks network connectivity
 * - Injects auth token from storage
 */
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Check network connectivity
    const isConnected = await checkConnectivity();
    if (!isConnected) {
      return Promise.reject({
        message: 'No internet connection. Please check your network.',
        isNetworkError: true,
      });
    }

    // Inject auth token if available
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 * - Handles API errors
 * - Extracts error messages
 * - Handles token refresh on 401
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return the response data directly
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Check if it's a network error
    if (!error.response) {
      const isConnected = await checkConnectivity();
      if (!isConnected) {
        return Promise.reject({
          message: 'No internet connection. Please check your network.',
          isNetworkError: true,
        });
      }
    }

    // Handle 401 Unauthorized - Token Refresh Logic
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshResponse = await axios.post(
          `${Config.API_BASE_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );

        if (refreshResponse.data?.data?.token) {
          const newToken = refreshResponse.data.data.token;
          setAuthToken(newToken);

          // Update the auth store (will be handled by the hook)
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return apiClient(originalRequest);
        }
      } catch {
        // Refresh failed - force logout
        // This will be handled by navigation (redirect to login)
        setAuthToken(null);

        return Promise.reject({
          message: 'Session expired. Please login again.',
          shouldLogout: true,
        });
      }
    }

    // Extract error message from response
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';

    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  },
);

export default apiClient;
