import { Pressable, StyleSheet, View, type PressableAndroidRippleConfig } from "react-native";
import { useTheme } from "../../store/ThemeContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

function CustomNavbar({descriptors, insets, navigation, state}: BottomTabBarProps) {
  const {colors} = useTheme()

  const iconSize = 42
  const iconColor = colors.onBackground

  const rippleConfig: PressableAndroidRippleConfig = {
    color: colors.touchColor
  }

  return (
    <View style={[{backgroundColor: colors.surfaceVariant}, styles.container]}>
      <Pressable android_ripple={rippleConfig} style={styles.pressable} onPress={() => navigation.navigate('Map')}>
        <Ionicons name="search" size={iconSize} color={iconColor} />
      </Pressable>
      <Pressable android_ripple={rippleConfig} style={styles.pressable} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={iconSize} color={iconColor} />
      </Pressable>
      <Pressable android_ripple={rippleConfig} style={styles.pressable} onPress={() => navigation.navigate('MyProfile')}>
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
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
    padding: 16
  }
})