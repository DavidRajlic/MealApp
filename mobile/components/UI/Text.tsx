import { Text as TextRN, TextProps } from "react-native"

interface MyTextProps extends TextProps {

}

function Text({style, ...props}: MyTextProps) {
  return (
    <TextRN style={[{fontSize: 16}, style]} {...props} />
  )
}

export default Text