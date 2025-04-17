import { Keyboard, Pressable, StyleSheet, View, type PressableAndroidRippleConfig } from "react-native";
import { useTheme } from "../../store/ThemeContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";

function CustomNavbar({descriptors, insets, navigation, state}: BottomTabBarProps) {
  const {colors} = useTheme()

  const [keyboardVisible, setKeyboardVisible] = useState<boolean>();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const iconSize = 42
  const iconColor = colors.onBackground
  const iconSelectedColor = colors

  const rippleConfig: PressableAndroidRippleConfig = {
    color: colors.touchColor
  }

  if(keyboardVisible)
    return <></>

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