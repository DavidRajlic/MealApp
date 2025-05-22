import { View, TextInput as TextInputRN, ViewStyle, StyleProp, TextInputProps, StyleSheet } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import Ionicons from "@expo/vector-icons/Ionicons"

interface MyTextInputProps extends Omit<TextInputProps, "style"> {
  style?: StyleProp<ViewStyle>,
  containerStyle?: StyleProp<ViewStyle>,
  hasIcon?: boolean
}

function TextInput({ style, containerStyle, hasIcon = false, ...props }: MyTextInputProps) {
  const { colors } = useTheme()

  return (
    <View style={[{ backgroundColor: colors.surface }, styles.containerStyle, containerStyle, style]}>
      {hasIcon && (
        <Ionicons name="search" size={20} color={colors.onSurface} style={styles.icon} />
      )}
      <TextInputRN
        style={[{ color: colors.onBackground }, styles.textInput, style]}
        placeholderTextColor={colors.onSurface}
        {...props}
      />
    </View>
  )
}

export default TextInput

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 16,
  },
})
