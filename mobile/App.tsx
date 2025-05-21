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
import {StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient()

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SafeAreaProvider>
          <ThemeContextProvider>
            <NavigationContainer>
              <StatusBar translucent style='auto' />
              <AppNavigation />
            </NavigationContainer>
          </ThemeContextProvider>
        </SafeAreaProvider>
      </UserProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  }
});
