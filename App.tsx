/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import { ThemeProvider, useTheme, useThemeMode } from '@rneui/themed';
import { StripeProvider } from '@stripe/stripe-react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Config from '@/config/app.config';
import AppNavigationContainer from '@/navigation/NavigationContainer';
import { useThemeStore } from '@/store/themeStore';
import { theme } from '@/theme';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Initialize OneSignal
if (Config.ONESIGNAL_APP_ID) {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize(Config.ONESIGNAL_APP_ID);
}

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AppContent />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

// App content with theme integration
function AppContent() {
  const { mode: storedMode, isInitialized } = useThemeStore();
  const { setMode, mode } = useThemeMode();
  const { theme: currentTheme } = useTheme();

  // Sync theme mode from store after rehydration and on every change
  useEffect(() => {
    if (!isInitialized) return; // Wait for rehydration to complete
    if (mode !== storedMode) {
      // Only sync if modes are different to prevent infinite loop
      setMode(storedMode);
    }
  }, [isInitialized, storedMode, mode, setMode]);

  return (
    <SafeAreaProvider>
      <StripeProvider publishableKey={Config.STRIPE_PUBLISHABLE_KEY}>
        <ToastProvider>
          <StatusBar
            barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            backgroundColor={currentTheme.colors.background}
          />
          <AppNavigationContainer />
        </ToastProvider>
      </StripeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
