import { Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "../../context/ThemeContext";

type MarkerIconProps = {
  onPress?: () => void;
};

// this is a bug with new architecture: https://github.com/maplibre/maplibre-react-native/issues/557

function MarkerIcon({ onPress }: MarkerIconProps) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
      <Ionicons name="pin-outline" size={36} color={colors.primary} />
    </Pressable>
  );
}

export default MarkerIcon;
