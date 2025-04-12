import { PressableProps, Pressable, type StyleProp, StyleSheet, View, type ViewStyle, ActivityIndicator } from "react-native"
import Text from "./Text"
import { type ReactNode } from "react"
import { useTheme } from "../../store/ThemeContext"

interface MyButtonProps extends PressableProps {
  mode?: "PRIMARY" | "SECONDARY" | "WARNING" | "TRANSPARENT",
  children?: ReactNode,
  style?: StyleProp<ViewStyle>,
  containerStyle?: StyleProp<ViewStyle>,
  loading?: boolean
}

function Button({style, mode = "PRIMARY", children, containerStyle, loading = false, ...props}: MyButtonProps) {
  const {colors} = useTheme()
  let bgColor: string
  let fgColor: string

  if(mode === "PRIMARY") {
    bgColor = colors.primary
    fgColor = colors.onPrimary
  } else if (mode === "SECONDARY") {
    bgColor = colors.secondary
    fgColor = colors.onSecondary
  } else if (mode === "WARNING") {
    bgColor = colors.error
    fgColor = colors.onError
  } else {
    bgColor = "transparent"
    fgColor = colors.onBackground
  }
  
  return (
    <View style={[{ backgroundColor: bgColor }, styles.containerStyle, containerStyle]}>
      <Pressable style={[styles.buttonStyle, style]} {...props} android_ripple={{color: colors.onSurfaceDisabled}}>
        {
          loading && <ActivityIndicator color={fgColor} />
        }
        <Text style={{color: fgColor}}>{children}</Text>
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
    padding: 16,
    flexDirection: 'row',
    gap: 8
  }
})