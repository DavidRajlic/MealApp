import { View, TextInput as TextInputRN, ViewStyle, StyleProp, TextInputProps, StyleSheet } from "react-native"
import { useTheme } from "../../store/ThemeContext"

interface MyTextInputProps extends Omit<TextInputProps, "style"> {
  style?: StyleProp<ViewStyle>,
  containerStyle?: StyleProp<ViewStyle>,
}

function TextInput({style, containerStyle, ...props}: MyTextInputProps) {
  const {colors} = useTheme()

  return (
    <View style={[{backgroundColor: colors.surface}, styles.containerStyle, containerStyle]}>
      <TextInputRN style={[{ color: colors.onBackground },styles.textInput, style]} placeholderTextColor={colors.onSurface} {...props} />
    </View>
  )
}

export default TextInput

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 50,
  },
  textInput: {
    fontSize: 16,
    padding: 16,
    paddingLeft: 24
  }
})