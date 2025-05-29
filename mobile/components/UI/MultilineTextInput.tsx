import React, { useState } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { useTheme } from "../../context/ThemeContext";

type Props = TextInputProps & {
    style?: any;
    placeholder?: string;
};

export default function MultilineTextInput({ style, placeholder, ...props }: Props) {
    const [text, setText] = useState("");
    const { colors } = useTheme()

    return (
        <TextInput
            multiline
            value={text}
            onChangeText={setText}
            placeholder={placeholder}
            style={[styles.textInput, style]}
            textAlignVertical="top"
            placeholderTextColor={colors.onSurface}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    textInput: {
        height: 150,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
});
