/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';

import { theme } from '@/theme';

import Home from './src/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Home />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
