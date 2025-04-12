import { Pressable, StyleSheet, View, type PressableAndroidRippleConfig } from "react-native";
import { useTheme } from "../../store/ThemeContext";
import Ionicons from '@expo/vector-icons/Ionicons';

function CustomNavbar() {
  const {colors} = useTheme()

  const iconSize = 42
  const iconColor = colors.onBackground

  const rippleConfig: PressableAndroidRippleConfig = {
    color: colors.touchColor
  }

  return (
    <View style={[{backgroundColor: colors.surfaceVariant}, styles.container]}>
      <Pressable android_ripple={rippleConfig} style={styles.pressable}>
        <Ionicons name="search" size={iconSize} color={iconColor} />
      </Pressable>
      <Pressable android_ripple={rippleConfig} style={styles.pressable}>
        <Ionicons name="home-outline" size={iconSize} color={iconColor} />
      </Pressable>
      <Pressable android_ripple={rippleConfig} style={styles.pressable}>
        <Ionicons name="person-circle-outline" size={iconSize} color={iconColor} />
      </Pressable>
    </View>
  )
}

export default CustomNavbar

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    overflow: 'hidden',
    flexDirection: 'row',
    marginHorizontal: 32,
    marginBottom: 16,
    elevation: 4,
    justifyContent: 'space-between',
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
    padding: 16
  }
})