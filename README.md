# React Native Boilerplate

A comprehensive, production-ready React Native boilerplate with authentication, payments, chat, notifications, and more. Built with TypeScript, Zustand, React Navigation, and Stripe integration.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Modules & Features](#modules--features)
- [Navigation](#navigation)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Payment Integration](#payment-integration)
- [Theming](#theming)
- [Customization](#customization)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### 🔐 Authentication
- Email/Password authentication
- OTP verification (Signup & Password Reset)
- Social authentication (Google & Apple Sign-In)
- Forgot password flow
- Secure token management with AsyncStorage
- Auto token refresh

### 💳 Payment Integration
- **One-time payments** via Stripe PaymentSheet
- **Recurring subscriptions** (Monthly/Yearly plans)
- Payment method management
- Subscription status tracking
- Secure payment processing

### 💬 Real-time Chat
- One-on-one messaging
- Real-time message delivery
- Chat history
- Conversation list
- Message status indicators

### 🔔 Notifications
- Push notifications (OneSignal)
- In-app notifications
- Notification badges
- Real-time notification updates
- Notification history

### 📱 Core Features
- Dark/Light theme support
- Multi-language support
- Profile management
- Feed/Posts system
- Image picker & media handling
- Form validation (Yup + React Hook Form)
- Toast notifications
- Loading states & skeletons
- Error handling

## 🛠 Tech Stack

### Core
- **React Native** 0.82.1
- **TypeScript** 5.8.3
- **React** 19.1.1

### Navigation
- **@react-navigation/native** - Navigation framework
- **@react-navigation/stack** - Stack navigator
- **@react-navigation/bottom-tabs** - Tab navigator
- **@react-navigation/drawer** - Drawer navigator

### State Management
- **Zustand** - Lightweight state management
- **@tanstack/react-query** - Server state management

### UI/UX
- **@rneui/themed** - UI component library
- **react-native-vector-icons** - Icons
- **react-native-toast-notifications** - Toast messages
- **react-native-size-matters** - Responsive sizing

### Forms & Validation
- **react-hook-form** - Form management
- **yup** - Schema validation
- **@hookform/resolvers** - Form resolvers

### Payments
- **@stripe/stripe-react-native** - Stripe SDK

### Networking
- **axios** - HTTP client
- **@react-native-community/netinfo** - Network status

### Storage
- **@react-native-async-storage/async-storage** - Local storage

### Notifications
- **react-native-onesignal** - Push notifications

### Chat
- **react-native-gifted-chat** - Chat UI
- **socket.io-client** - WebSocket client
- **react-native-sse** - Server-Sent Events

### Media
- **react-native-image-picker** - Image selection
- **react-native-svg** - SVG support

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Commit message linting

## 📁 Project Structure

```
src/
├── api/                    # API configuration
│   ├── client.ts          # Axios instance with interceptors
│   ├── endpoints.ts       # API endpoint constants
│   └── index.ts           # API exports
│
├── assets/                 # Static assets
│   ├── fonts/             # Custom fonts
│   └── svgs/              # SVG components
│
├── components/             # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Checkbox.tsx
│   ├── Dropdown.tsx
│   ├── Header.tsx
│   ├── LoadingSpinner.tsx
│   ├── TextArea.tsx
│   └── index.ts
│
├── config/                 # App configuration
│   └── app.config.ts      # Environment-based config
│
├── constants/              # App constants
│   ├── auth.ts
│   ├── chat.ts
│   ├── colors.ts
│   ├── fonts.ts
│   ├── onboarding.ts
│   ├── payment.ts
│   └── profile.ts
│
├── hooks/                  # Custom React hooks
│   ├── auth/              # Authentication hooks
│   ├── chat/              # Chat hooks
│   ├── feed/              # Feed hooks
│   ├── notifications/     # Notification hooks
│   ├── payment/           # Payment hooks
│   ├── useAppNavigation.ts
│   ├── useAppState.ts
│   ├── useDebounce.ts
│   └── useCounter.ts
│
├── models/                 # Data models/interfaces
│   ├── Api.ts
│   ├── user.ts
│   ├── notification.ts
│   └── index.ts
│
├── navigation/             # Navigation configuration
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── OnboardingNavigator.tsx
│   ├── MainStackNavigator.tsx
│   ├── BottomTabNavigator.tsx
│   ├── DrawerNavigator.tsx
│   ├── NavigationContainer.tsx
│   ├── NavigationRef.ts
│   └── Drawer/
│
├── screens/                # Screen components
│   ├── Auth/              # Authentication screens
│   │   ├── Start/
│   │   ├── SignIn/
│   │   ├── Signup/
│   │   ├── OTP/
│   │   ├── ForgotPassword/
│   │   └── ResetPassword/
│   │
│   ├── Onboarding/        # Onboarding screens
│   │   ├── Profile/
│   │   └── Privacy/
│   │
│   └── App/               # Main app screens
│       ├── Home/
│       ├── Feed/
│       ├── Chat/
│       ├── Profile/
│       ├── Notifications/
│       ├── Payment/
│       ├── EditProfile/
│       └── ChangePassword/
│
├── store/                  # Zustand stores
│   ├── authStore.ts
│   ├── chatStore.ts
│   ├── notificationStore.ts
│   └── themeStore.ts
│
├── theme/                  # Theme configuration
│   └── index.ts
│
├── types/                  # TypeScript type definitions
│   ├── routes.ts
│   ├── payment.ts
│   ├── chat.ts
│   ├── common.ts
│   ├── post.ts
│   ├── interface.ts
│   └── env.d.ts
│
└── utils/                  # Utility functions
    ├── formatters.ts
    ├── helpers.ts
    ├── media.ts
    ├── storage.ts
    ├── toast.tsx
    ├── validationSchemas.ts
    ├── onesignal.ts
    └── index.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- React Native development environment set up
- iOS: Xcode and CocoaPods
- Android: Android Studio and JDK

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-native-boilerplate
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # OR using Yarn
   yarn install
   ```

3. **Install iOS dependencies**
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # API Configuration
   API_BASE_URL=https://your-api-url.com

   # Social Authentication
   GOOGLE_WEB_CLIENT_ID=your-google-web-client-id
   GOOGLE_IOS_CLIENT_ID=your-google-ios-client-id
   ENABLE_GOOGLE_SIGNIN=true
   ENABLE_APPLE_SIGNIN=true

   # Push Notifications
   ONESIGNAL_APP_ID=your-onesignal-app-id

   # Stripe
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
   ```

5. **Start Metro bundler**
   ```bash
   npm start
   # OR
   yarn start
   ```

6. **Run the app**
   ```bash
   # iOS
   npm run ios
   # OR
   yarn ios

   # Android
   npm run android
   # OR
   yarn android
   ```

## ⚙️ Configuration

### Environment Variables

All environment variables are loaded from `.env` file and accessed via `@env`:

```typescript
import { API_BASE_URL, STRIPE_PUBLISHABLE_KEY } from '@env';
```

### App Configuration

Edit `src/config/app.config.ts` to modify app-wide settings:

```typescript
export const Config = {
  API_BASE_URL: API_BASE_URL || 'https://api.yourdomain.com',
  GOOGLE_WEB_CLIENT_ID: GOOGLE_WEB_CLIENT_ID || '',
  // ... other config
};
```

### Theme Configuration

Customize themes in `src/theme/index.ts`:

```typescript
export const theme = {
  light: {
    colors: {
      primary: '#007AFF',
      // ... other colors
    },
  },
  dark: {
    // dark theme colors
  },
};
```

## 📦 Modules & Features

### 🔐 Authentication Module

#### Features
- Email/password sign up and sign in
- OTP verification for signup and password reset
- Social authentication (Google & Apple)
- Secure token storage
- Auto token refresh

#### Usage

**Sign Up:**
```typescript
import { useSignup } from '@/hooks/auth';

const { signup, isLoading } = useSignup();

await signup({
  email: 'user@example.com',
  password: 'password123',
  fullName: 'John Doe',
});
```

**Sign In:**
```typescript
import { useSignIn } from '@/hooks/auth';

const { signIn, isLoading } = useSignIn();

await signIn({
  email: 'user@example.com',
  password: 'password123',
});
```

**Social Authentication:**
```typescript
import { useGoogleSignIn, useAppleSignIn } from '@/hooks/auth';

// Google Sign In
const { signInWithGoogle } = useGoogleSignIn();
await signInWithGoogle();

// Apple Sign In
const { signInWithApple } = useAppleSignIn();
await signInWithApple();
```

#### Customization

**Modify Auth Flow:**
- Edit screens in `src/screens/Auth/`
- Update validation schemas in `src/utils/validationSchemas.ts`
- Modify auth hooks in `src/hooks/auth/`

**Add New Auth Method:**
1. Create hook in `src/hooks/auth/`
2. Add endpoint in `src/api/endpoints.ts`
3. Create screen in `src/screens/Auth/`
4. Add route in `src/navigation/AuthNavigator.tsx`

### 💳 Payment Module

#### Features
- One-time payments via Stripe PaymentSheet
- Recurring subscriptions (Monthly/Yearly)
- Payment method management
- Secure payment processing

#### Usage

**One-time Payment:**
```typescript
import { usePaymentSheet } from '@/hooks/payment';

const { initializePaymentSheet, openPaymentSheet, isPaymentReady } = usePaymentSheet();

// Initialize payment
await initializePaymentSheet({
  amount: 1099, // in cents
  currency: 'usd',
});

// Open payment sheet
if (isPaymentReady) {
  await openPaymentSheet();
}
```

**Subscription:**
```typescript
import { useSubscriptionSetup } from '@/hooks/payment';

const { initializeSetupSheet, openSetupSheet, createSubscription } = useSubscriptionSetup();

// Initialize setup
await initializeSetupSheet('monthly'); // or 'yearly'

// Save payment method
const result = await openSetupSheet();

// Create subscription
if (result) {
  await createSubscription('monthly');
}
```

#### Customization

**Update Subscription Plans:**
Edit `src/constants/payment.ts`:
```typescript
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 14.99,
    interval: 'month',
    description: 'Billed monthly, cancel anytime',
  },
  // ... other plans
];
```

**Backend Integration:**
- Ensure backend has endpoints:
  - `POST /payment/payment-sheet` - One-time payment
  - `POST /payment/setup-intent` - Subscription setup
  - `POST /payment/subscribe-mobile` - Create subscription

### 💬 Chat Module

#### Features
- Real-time messaging
- Chat history
- Conversation list
- Message status indicators

#### Usage

```typescript
import { useChatMessages, useSendMessage } from '@/hooks/chat';

// Fetch messages
const { messages, isLoading } = useChatMessages(conversationId);

// Send message
const { sendMessage } = useSendMessage();
await sendMessage({
  conversationId,
  message: 'Hello!',
});
```

#### Customization

**Modify Chat UI:**
- Edit `src/screens/App/Chat/ChatConversation.tsx`
- Customize `react-native-gifted-chat` props

**Add Features:**
- File attachments: Extend `useSendMessage` hook
- Typing indicators: Add WebSocket event listener
- Read receipts: Update message model

### 🔔 Notifications Module

#### Features
- Push notifications (OneSignal)
- In-app notifications
- Notification badges
- Real-time updates

#### Usage

```typescript
import { useNotifications } from '@/hooks/notifications';

const { notifications, unreadCount, markAsRead } = useNotifications();

// Mark notification as read
await markAsRead(notificationId);
```

#### Customization

**Configure OneSignal:**
1. Get OneSignal App ID from dashboard
2. Add to `.env`: `ONESIGNAL_APP_ID=your-app-id`
3. Configure in `src/utils/onesignal.ts`

**Customize Notification Types:**
- Edit `src/types/notification.ts`
- Update `src/hooks/notifications/` hooks
- Modify notification UI in `src/screens/App/Notifications/`

### 📱 Profile Module

#### Features
- View profile
- Edit profile
- Change password
- Language selection
- Theme toggle

#### Usage

```typescript
import { useAuthStore } from '@/store/authStore';

const { user, setUser } = useAuthStore();

// Update user
setUser({ ...user, fullName: 'New Name' });
```

#### Customization

**Add Profile Fields:**
1. Update `User` model in `src/models/user.ts`
2. Add field to `src/screens/App/EditProfile/`
3. Update validation schema

### 📰 Feed Module

#### Features
- Post feed
- Like/unlike posts
- Post details

#### Usage

```typescript
import { useFetchPosts, useTogglePostLike } from '@/hooks/feed';

// Fetch posts
const { posts, isLoading } = useFetchPosts();

// Toggle like
const { toggleLike } = useTogglePostLike();
await toggleLike(postId);
```

## 🧭 Navigation

### Navigation Structure

```
Root Navigator
├── Auth Stack
│   ├── Start
│   ├── SignIn
│   ├── Signup
│   ├── OTP
│   ├── ForgotPassword
│   └── ResetPassword
│
├── Onboarding Stack
│   ├── Profile
│   └── Privacy
│
└── App Stack
    └── Drawer Navigator
        └── Main Stack
            ├── Dashboard (Bottom Tabs)
            │   ├── Home
            │   ├── Feed
            │   ├── Chat
            │   └── Profile
            ├── EditProfile
            ├── ChangePassword
            ├── Notifications
            ├── ChatList
            ├── ChatConversation
            └── Payment
```

### Adding New Routes

1. **Add route enum** in `src/types/routes.ts`:
   ```typescript
   export enum APP_ROUTES {
     // ... existing routes
     NEW_SCREEN = 'NewScreen',
   }
   ```

2. **Add type definition**:
   ```typescript
   export type MainStackNavigatorParamList = {
     // ... existing routes
     [APP_ROUTES.NEW_SCREEN]: { param1: string };
   };
   ```

3. **Add screen to navigator** in `src/navigation/MainStackNavigator.tsx`:
   ```typescript
   <Stack.Screen
     name={APP_ROUTES.NEW_SCREEN}
     component={NewScreen}
     options={{ title: 'New Screen' }}
   />
   ```

4. **Navigate to screen**:
   ```typescript
   navigation.navigate(APP_ROUTES.NEW_SCREEN, { param1: 'value' });
   ```

## 🗄️ State Management

### Zustand Stores

**Auth Store** (`src/store/authStore.ts`):
```typescript
const { user, token, setUser, setToken, logout } = useAuthStore();
```

**Theme Store** (`src/store/themeStore.ts`):
```typescript
const { mode, toggleMode } = useThemeStore();
```

**Chat Store** (`src/store/chatStore.ts`):
```typescript
const { conversations, addConversation } = useChatStore();
```

**Notification Store** (`src/store/notificationStore.ts`):
```typescript
const { notifications, unreadCount } = useNotificationStore();
```

### Creating New Store

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MyStore {
  data: string | null;
  setData: (data: string) => void;
}

export const useMyStore = create<MyStore>()(
  persist(
    set => ({
      data: null,
      setData: data => set({ data }),
    }),
    { name: 'my-storage' }
  )
);
```

## 🌐 API Integration

### API Client

The API client (`src/api/client.ts`) includes:
- Automatic token injection
- Request/response interceptors
- Error handling
- Network connectivity checks
- Token refresh logic

### Adding New Endpoints

1. **Add endpoint** in `src/api/endpoints.ts`:
   ```typescript
   export const MY_ENDPOINTS = {
     GET_DATA: '/my-endpoint',
     POST_DATA: '/my-endpoint',
   };
   ```

2. **Use in component**:
   ```typescript
   import apiClient from '@/api/client';
   import { MY_ENDPOINTS } from '@/api/endpoints';

   const response = await apiClient.get(MY_ENDPOINTS.GET_DATA);
   ```

### Error Handling

The API client automatically handles:
- Network errors
- 401 Unauthorized (token refresh)
- Error message extraction

Custom error handling:
```typescript
try {
  await apiClient.post('/endpoint', data);
} catch (error) {
  const message = (error as { message?: string })?.message;
  showToast(message || 'Error occurred', 'error');
}
```

## 🎨 Theming

### Theme Structure

Themes are defined in `src/theme/index.ts` and support:
- Light/Dark modes
- Custom colors
- Typography
- Spacing

### Using Theme

```typescript
import { useTheme } from '@rneui/themed';

const { theme } = useTheme();

<View style={{ backgroundColor: theme.colors.primary }}>
  <Text style={{ color: theme.colors.foreground }}>Text</Text>
</View>
```

### Customizing Theme

Edit `src/theme/index.ts`:
```typescript
export const theme = {
  light: {
    colors: {
      primary: '#007AFF',
      secondary: '#5856D6',
      // ... add your colors
    },
  },
  dark: {
    colors: {
      primary: '#0A84FF',
      // ... dark theme colors
    },
  },
};
```

## 🔧 Customization

### Adding New Component

1. Create component in `src/components/`:
   ```typescript
   // src/components/MyComponent.tsx
   import React from 'react';
   import { View, Text } from 'react-native';

   export const MyComponent = () => {
     return (
       <View>
         <Text>My Component</Text>
       </View>
     );
   };
   ```

2. Export from `src/components/index.ts`:
   ```typescript
   export { MyComponent } from './MyComponent';
   ```

### Adding New Hook

1. Create hook in `src/hooks/`:
   ```typescript
   // src/hooks/useMyHook.ts
   import { useState } from 'react';

   export const useMyHook = () => {
     const [data, setData] = useState(null);
     return { data, setData };
   };
   ```

### Adding New Screen

1. Create screen directory:
   ```
   src/screens/App/MyScreen/
     └── index.tsx
   ```

2. Add to navigation (see [Navigation](#navigation) section)

### Modifying Constants

Edit files in `src/constants/`:
- `colors.ts` - Color constants
- `fonts.ts` - Font constants
- `auth.ts` - Auth-related constants
- `payment.ts` - Payment constants

## 📝 Best Practices

### Code Organization

1. **File Naming:**
   - Components: PascalCase (`MyComponent.tsx`)
   - Utilities/Constants: camelCase (`myUtils.ts`)
   - Hooks: camelCase with `use` prefix (`useMyHook.ts`)

2. **Component Structure:**
   - Keep components under 200 lines
   - Split large components into smaller ones
   - Use custom hooks for business logic

3. **Type Safety:**
   - Always define types/interfaces
   - Avoid `any` type
   - Use TypeScript strictly

### State Management

- Use Zustand for global state
- Use React Query for server state
- Keep component state local when possible

### API Calls

- Use React Query for data fetching
- Handle loading and error states
- Implement proper error messages

### Styling

- Use `makeStyles` from `@rneui/themed`
- Use `react-native-size-matters` for responsive sizing
- Follow theme colors

## 🐛 Troubleshooting

### Common Issues

**Metro bundler issues:**
```bash
# Clear cache
npm start -- --reset-cache
# OR
yarn start --reset-cache
```

**iOS build issues:**
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..
```

**Android build issues:**
```bash
cd android
./gradlew clean
cd ..
```

**Environment variables not loading:**
- Ensure `.env` file is in root directory
- Restart Metro bundler
- Check `babel.config.js` has `react-native-dotenv` plugin

**Stripe payment issues:**
- Verify `STRIPE_PUBLISHABLE_KEY` in `.env`
- Check backend endpoints are configured
- Ensure backend has correct Stripe keys

**Navigation issues:**
- Check route names match enum values
- Verify navigation types are correct
- Ensure screen is registered in navigator

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Stripe React Native](https://stripe.com/docs/payments/accept-a-payment?platform=react-native)
- [React Query](https://tanstack.com/query/latest)

## 🤝 Contributing

1. Follow the code style guidelines
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## 📄 License

[Your License Here]

---

**Built with ❤️ using React Native**
