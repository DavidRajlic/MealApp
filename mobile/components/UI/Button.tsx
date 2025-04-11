import { PressableProps, Pressable, type StyleProp, StyleSheet, View, type ViewStyle } from "react-native"
import Text from "./Text"
import { type ReactNode } from "react"

interface MyButtonProps extends PressableProps {
  mode?: "PRIMARY" | "SECONDARY" | "WARNING" | "TRANSPARENT",
  children?: ReactNode,
  style?: StyleProp<ViewStyle>,
  containerStyle?: StyleProp<ViewStyle>,
}

function Button({style, mode = "PRIMARY", children, containerStyle, ...props}: MyButtonProps) {

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Pressable style={[styles.buttonStyle, style]} {...props} android_ripple={{color:'grey'}}>
        <Text>{children}</Text>
      </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  buttonStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 16
  }
})