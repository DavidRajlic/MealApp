import { Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "../../context/ThemeContext";

type MarkerIconProps = {
  onPress?: () => void;
};

function MarkerIcon({ onPress }: MarkerIconProps) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} hitSlop={32} style={{ width: 72, height: 72, justifyContent: 'center', alignItems: 'center' }}>
      <Ionicons name="pin-outline" size={36} color={colors.primary} />
    </Pressable>
  );
}

export default MarkerIcon;
