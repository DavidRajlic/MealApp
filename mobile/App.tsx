import ThemeContextProvider from './store/ThemeContext';
import ComponentsScreen from './screens/ComponentsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
        <StatusBar translucent style='auto' />
        <ComponentsScreen />
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
}