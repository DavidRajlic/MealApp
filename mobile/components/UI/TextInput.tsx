import { View, TextInput as TextInputRN, ViewStyle, StyleProp, TextInputProps, StyleSheet } from "react-native"

interface MyTextInputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>,
  containerStyle?: StyleProp<ViewStyle>,
}

function TextInput({style, containerStyle, ...props}: MyTextInputProps) {

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <TextInputRN style={[styles.textInput, style]} placeholderTextColor={"white"} {...props} />
    </View>
  )
}

export default TextInput

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 50,
    backgroundColor: '#aaa'
  },
  textInput: {
    fontSize: 16,
    padding: 16,
    paddingLeft: 24
  }
})