import ThemeContextProvider from './store/ThemeContext';
import ComponentsScreen from './screens/ComponentsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
        <ComponentsScreen />
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
}