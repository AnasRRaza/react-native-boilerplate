/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';

import AppNavigationContainer from '@/navigation/NavigationContainer';
import { theme } from '@/theme';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <AppNavigationContainer />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
