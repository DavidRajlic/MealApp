import ThemeContextProvider from './context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './Navigation';
import { UserProvider } from './context/UserContext';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <UserProvider>
      <SafeAreaProvider>
        <ThemeContextProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <StatusBar translucent style='auto' />
              <AppNavigation />
            </NavigationContainer>
          </QueryClientProvider>
        </ThemeContextProvider>
      </SafeAreaProvider>
    </UserProvider>
  );
}