import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

// Stack names
export enum STACKS {
  AUTH = 'Auth',
  ONBOARDING = 'Onboarding',
  APP = 'App',
}

// Auth routes
export enum AUTH_ROUTES {
  START = 'start',
  SIGNIN = 'signin',
  SIGNUP = 'signup',
  OTP = 'otp',
  FORGOT_PASSWORD = 'forgot_password',
  RESET_PASSWORD = 'reset_password',
}

// Onboarding routes
export enum ONBOARDING_ROUTES {
  PROFILE = 'profile',
  PRIVACY = 'privacy',
}

// App routes
export enum APP_ROUTES {
  DRAWER = 'drawer',
  HOME = 'home',
  EDIT_PROFILE = 'EditProfile',
  CHANGE_PASSWORD = 'ChangePassword',
  // Add more app routes here as needed
}

// Bottom tab routes
export enum BOTTOM_TAB_ROUTES {
  HOME = 'home',
  PROFILE = 'profile',
  SETTINGS = 'settings',
}

// Drawer routes
export enum DRAWER_ROUTES {
  MAIN = 'main',
  // Add drawer-specific routes here
}

// Auth Stack Param List
export type AuthStackNavigatorParamList = {
  [AUTH_ROUTES.START]: undefined;
  [AUTH_ROUTES.SIGNIN]: undefined;
  [AUTH_ROUTES.SIGNUP]: undefined;
  [AUTH_ROUTES.OTP]: {
    email: string;
    otpType: 'signup' | 'forgot-password';
  };
  [AUTH_ROUTES.FORGOT_PASSWORD]: undefined;
  [AUTH_ROUTES.RESET_PASSWORD]: {
    email: string;
    token: string;
  };
};

// Onboarding Stack Param List
export type OnboardingStackNavigatorParamList = {
  [ONBOARDING_ROUTES.PROFILE]: undefined;
  [ONBOARDING_ROUTES.PRIVACY]: {
    profileData: {
      fullName: string;
      age: string;
      country: string;
      preferredLanguage: string;
      profileImage?: {
        uri?: string;
        fileName?: string;
        type?: string;
      };
    };
  };
};

// Bottom Tab Param List
export type BottomTabParamList = {
  [BOTTOM_TAB_ROUTES.HOME]: undefined;
  [BOTTOM_TAB_ROUTES.PROFILE]: undefined;
  [BOTTOM_TAB_ROUTES.SETTINGS]: undefined;
};

// Main Stack Param List (within drawer)
export type MainStackNavigatorParamList = {
  Dashboard: NavigatorScreenParams<BottomTabParamList>;
  [APP_ROUTES.EDIT_PROFILE]: undefined;
  [APP_ROUTES.CHANGE_PASSWORD]: undefined;
  // Add more main stack screens here
};

// Drawer Param List
export type DrawerNavigatorParamList = {
  [DRAWER_ROUTES.MAIN]: NavigatorScreenParams<MainStackNavigatorParamList>;
  // Add drawer screens here
};

// App Stack Param List
export type AppStackNavigatorParamList = {
  [APP_ROUTES.DRAWER]: NavigatorScreenParams<DrawerNavigatorParamList>;
};

// Root Stack Param List
export type RootStackParamList = {
  [STACKS.AUTH]: NavigatorScreenParams<AuthStackNavigatorParamList>;
  [STACKS.ONBOARDING]: NavigatorScreenParams<OnboardingStackNavigatorParamList>;
  [STACKS.APP]: NavigatorScreenParams<AppStackNavigatorParamList>;
};

// Navigation Props for type-safe navigation
export type AuthStackNavigationProp =
  StackNavigationProp<AuthStackNavigatorParamList>;

export type OnboardingStackNavigationProp =
  StackNavigationProp<OnboardingStackNavigatorParamList>;

export type MainStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackNavigatorParamList>,
  StackNavigationProp<RootStackParamList>
>;

export type AppNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AppStackNavigatorParamList>,
  StackNavigationProp<RootStackParamList>
>;

export type StacksNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;
