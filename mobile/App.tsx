import ThemeContextProvider from './store/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './Navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
        <NavigationContainer>
          <StatusBar translucent style='auto' />
          <AppNavigation />
        </NavigationContainer>
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
}